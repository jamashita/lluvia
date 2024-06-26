import { type ImmutableAddress, MutableAddress } from '../address/index.js';
import { MutableDictionary } from '../dictionary/index.js';
import { ATree } from './ATree.js';
import { ClosureTableHierarchies } from './ClosureTable/index.js';
import type { StructurableTreeObject } from './StructurableTreeObject.js';
import type { TreeID } from './TreeID.js';
import type { StructurableTreeNode } from './TreeNode/index.js';

export class StructurableTree<out K extends TreeID, out V extends StructurableTreeObject<K>> extends ATree<V, StructurableTreeNode<K, V>> {
  public static of<K extends TreeID, V extends StructurableTreeObject<K>>(root: StructurableTreeNode<K, V>): StructurableTree<K, V> {
    return new StructurableTree(root);
  }

  protected constructor(root: StructurableTreeNode<K, V>) {
    super(root);
  }

  public getTreeID(): K {
    return this.root.getTreeID();
  }

  public has(key: K): boolean {
    return this.root.has(key);
  }

  private retrieve(node: StructurableTreeNode<K, V>, hierarchies: MutableDictionary<K, MutableAddress<K>>): void {
    const offsprings: MutableAddress<K> = MutableAddress.empty();

    offsprings.add(node.getTreeID());
    hierarchies.set(node.getTreeID(), offsprings);

    if (!node.isLeaf()) {
      this.retrieveChildren(node, node.getChildren(), hierarchies);
    }
  }

  private retrieveChildren(
    node: StructurableTreeNode<K, V>,
    children: ImmutableAddress<StructurableTreeNode<K, V>>,
    hierarchies: MutableDictionary<K, MutableAddress<K>>
  ): void {
    for (const [, child] of children) {
      hierarchies.get(node.getTreeID())?.add(child.getTreeID());

      this.retrieve(child, hierarchies);

      if (!child.isLeaf()) {
        this.retrieveChildren(node, child.getChildren(), hierarchies);
      }
    }
  }

  public toHierarchies(): ClosureTableHierarchies<K> {
    const hierarchies: MutableDictionary<K, MutableAddress<K>> = MutableDictionary.empty();

    this.retrieve(this.root, hierarchies);

    return ClosureTableHierarchies.of<K>(hierarchies);
  }
}
