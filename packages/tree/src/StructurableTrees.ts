import { Kind, Nullable } from '@jamashita/anden-type';
import { MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ImmutableProject, MutableProject, ReadonlyProject } from '@jamashita/lluvia-project';
import { ReadonlySequence } from '@jamashita/lluvia-sequence';
import { ATrees } from './ATrees';
import { ClosureTable, ClosureTableHierarchies, ClosureTableHierarchy } from './ClosureTable';
import { StructurableTree } from './StructurableTree';
import { StructurableTreeObject } from './StructurableTreeObject';
import { TreeError } from './TreeError';
import { TreeID } from './TreeID';
import { StructurableTreeNode } from './TreeNode';

export class StructurableTrees<K extends TreeID, V extends StructurableTreeObject<K>> extends ATrees<K, V, StructurableTreeNode<K, V>, StructurableTree<K, V>, MutableProject<K, StructurableTree<K, V>>> {
  public static empty<K extends TreeID, V extends StructurableTreeObject<K>>(): StructurableTrees<K, V> {
    return StructurableTrees.ofProject(ImmutableProject.empty());
  }

  private static forgeInternal<K extends TreeID, V extends StructurableTreeObject<K>>(key: K, values: ReadonlyProject<K, V>, table: ClosureTable<K>, pool: MutableProject<K, StructurableTreeNode<K, V>>, used: MutableAddress<K>): StructurableTreeNode<K, V> {
    const value: Nullable<V> = values.get(key);

    if (Kind.isNull(value)) {
      throw new TreeError(`THIS KEY DOES NOT HAVE VALUE. GIVEN: ${key.toString()}`);
    }

    const n: Nullable<StructurableTreeNode<K, V>> = pool.get(key);

    if (!Kind.isNull(n)) {
      pool.remove(key);
      used.add(key);

      return n;
    }

    const children: Nullable<ReadonlyAddress<K>> = table.get(key);

    if (Kind.isNull(children)) {
      throw new TreeError(`CLOSURE TABLE DOES NOT CONTAIN THIS KEY. GIVEN: ${key.toString()}`);
    }

    const address: MutableAddress<StructurableTreeNode<K, V>> = MutableAddress.empty();

    children.forEach((k: K) => {
      if (k.equals(key)) {
        return;
      }
      if (used.contains(k)) {
        return;
      }

      address.add(StructurableTrees.forgeInternal(k, values, table, pool, used));
    });

    const node: StructurableTreeNode<K, V> = StructurableTreeNode.ofValue(value, address);

    pool.set(key, node);

    return node;
  }

  public static of<K extends TreeID, V extends StructurableTreeObject<K>>(trees: StructurableTrees<K, V>): StructurableTrees<K, V> {
    return StructurableTrees.ofProject(trees.trees);
  }

  public static ofInternal<K extends TreeID, V extends StructurableTreeObject<K>>(project: ReadonlyProject<K, StructurableTree<K, V>>): StructurableTrees<K, V> {
    return new StructurableTrees(MutableProject.of(project));
  }

  public static ofProject<K extends TreeID, V extends StructurableTreeObject<K>>(project: ReadonlyProject<K, StructurableTree<K, V>>): StructurableTrees<K, V> {
    return StructurableTrees.ofInternal(project);
  }

  public static ofTable<K extends TreeID, V extends StructurableTreeObject<K>>(table: ClosureTable<K>, values: ReadonlySequence<V>): StructurableTrees<K, V> {
    if (table.isEmpty()) {
      if (values.isEmpty()) {
        return StructurableTrees.empty();
      }

      throw new TreeError('CLOSURE TABLE IS EMPTY');
    }
    if (values.isEmpty()) {
      throw new TreeError('VALUES ARE EMPTY');
    }

    const vs: ReadonlyProject<K, V> = StructurableTrees.toProject<K, V>(values);
    const pool: MutableProject<K, StructurableTreeNode<K, V>> = MutableProject.empty();
    const used: MutableAddress<K> = MutableAddress.empty();

    table.sort().toArray().forEach((key: K) => {
      StructurableTrees.forgeInternal(key, vs, table, pool, used);
    });

    const trees: MutableProject<K, StructurableTree<K, V>> = pool.map((node: StructurableTreeNode<K, V>): StructurableTree<K, V> => {
      return StructurableTree.of<K, V>(node);
    });

    return StructurableTrees.ofProject<K, V>(trees);
  }

  private static toProject<K extends TreeID, V extends StructurableTreeObject<K>>(sequence: ReadonlySequence<V>): ReadonlyProject<K, V> {
    const project: MutableProject<K, V> = MutableProject.empty();

    sequence.forEach((v: V) => {
      project.set(v.getTreeID(), v);
    });

    return project;
  }

  protected constructor(trees: MutableProject<K, StructurableTree<K, V>>) {
    super(trees);
  }

  public add(tree: StructurableTree<K, V>): this {
    this.trees.set(tree.getTreeID(), tree);

    return this;
  }

  public has(key: K): boolean {
    return this.trees.some((tree: StructurableTree<K, V>) => {
      return tree.has(key);
    });
  }

  public toHierarchies(): ClosureTableHierarchies<K> {
    const hierarchies: Array<ClosureTableHierarchy<K>> = [];

    this.trees.forEach((tree: StructurableTree<K, V>) => {
      hierarchies.push(...tree.toHierarchies().values());
    });

    return ClosureTableHierarchies.ofArray(hierarchies);
  }
}
