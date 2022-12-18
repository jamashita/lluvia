import { Kind, Nullable } from '@jamashita/anden/type';
import { MutableAddress, ReadonlyAddress } from '../address/index.js';
import { ImmutableDictionary, MutableDictionary, ReadonlyDictionary } from '../dictionary/index.js';
import { ReadonlySequence } from '../sequence/index.js';
import { ATrees } from './ATrees.js';
import { ClosureTable, ClosureTableHierarchies, ClosureTableHierarchy } from './ClosureTable/index.js';
import { StructurableTree } from './StructurableTree.js';
import { StructurableTreeObject } from './StructurableTreeObject.js';
import { TreeError } from './TreeError.js';
import { TreeID } from './TreeID.js';
import { StructurableTreeNode } from './TreeNode/index.js';

export class StructurableTrees<out K extends TreeID, out V extends StructurableTreeObject<K>> extends ATrees<K, V, StructurableTreeNode<K, V>, StructurableTree<K, V>, MutableDictionary<K, StructurableTree<K, V>>> {
  public static empty<K extends TreeID, V extends StructurableTreeObject<K>>(): StructurableTrees<K, V> {
    return StructurableTrees.ofDictionary(ImmutableDictionary.empty());
  }

  private static forgeInternal<K extends TreeID, V extends StructurableTreeObject<K>>(key: K, values: ReadonlyDictionary<K, V>, table: ClosureTable<K>, pool: MutableDictionary<K, StructurableTreeNode<K, V>>, used: MutableAddress<K>): StructurableTreeNode<K, V> {
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
    return StructurableTrees.ofDictionary(trees.trees);
  }

  public static ofDictionary<K extends TreeID, V extends StructurableTreeObject<K>>(dictionary: ReadonlyDictionary<K, StructurableTree<K, V>>): StructurableTrees<K, V> {
    return StructurableTrees.ofInternal(dictionary);
  }

  public static ofInternal<K extends TreeID, V extends StructurableTreeObject<K>>(dictionary: ReadonlyDictionary<K, StructurableTree<K, V>>): StructurableTrees<K, V> {
    return new StructurableTrees(MutableDictionary.of(dictionary));
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

    const vs: ReadonlyDictionary<K, V> = StructurableTrees.toDictionary<K, V>(values);
    const pool: MutableDictionary<K, StructurableTreeNode<K, V>> = MutableDictionary.empty();
    const used: MutableAddress<K> = MutableAddress.empty();

    table.sort().toArray().forEach((key: K) => {
      StructurableTrees.forgeInternal(key, vs, table, pool, used);
    });

    const trees: MutableDictionary<K, StructurableTree<K, V>> = pool.map((node: StructurableTreeNode<K, V>): StructurableTree<K, V> => {
      return StructurableTree.of<K, V>(node);
    });

    return StructurableTrees.ofDictionary<K, V>(trees);
  }

  private static toDictionary<K extends TreeID, V extends StructurableTreeObject<K>>(sequence: ReadonlySequence<V>): ReadonlyDictionary<K, V> {
    const dictionary: MutableDictionary<K, V> = MutableDictionary.empty();

    sequence.forEach((v: V) => {
      dictionary.set(v.getTreeID(), v);
    });

    return dictionary;
  }

  protected constructor(trees: MutableDictionary<K, StructurableTree<K, V>>) {
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
