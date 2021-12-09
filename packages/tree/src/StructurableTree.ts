import { ImmutableAddress, MutableAddress } from '@jamashita/lluvia-address';
import { MutableProject } from '@jamashita/lluvia-project';
import { ATree } from './ATree';
import { ClosureTableHierarchies } from './ClosureTable/ClosureTableHierarchies';
import { StructurableTreeObject } from './StructurableTreeObject';
import { TreeID } from './TreeID';
import { StructurableTreeNode } from './TreeNode/StructurableTreeNode';

export class StructurableTree<K extends TreeID, V extends StructurableTreeObject<K>> extends ATree<V, StructurableTreeNode<K, V>> {
  public static of<KT extends TreeID, VT extends StructurableTreeObject<KT>>(root: StructurableTreeNode<KT, VT>): StructurableTree<KT, VT> {
    return new StructurableTree<KT, VT>(root);
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

  private retrieve(node: StructurableTreeNode<K, V>, hierarchies: MutableProject<K, MutableAddress<K>>): void {
    const offsprings: MutableAddress<K> = MutableAddress.empty<K>();

    offsprings.add(node.getTreeID());
    hierarchies.set(node.getTreeID(), offsprings);

    if (!node.isLeaf()) {
      this.retrieveChildren(node, node.getChildren(), hierarchies);
    }
  }

  private retrieveChildren(node: StructurableTreeNode<K, V>, children: ImmutableAddress<StructurableTreeNode<K, V>>, hierarchies: MutableProject<K, MutableAddress<K>>): void {
    children.forEach((child: StructurableTreeNode<K, V>) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      hierarchies.get(node.getTreeID())!.add(child.getTreeID());

      this.retrieve(child, hierarchies);

      if (!child.isLeaf()) {
        this.retrieveChildren(node, child.getChildren(), hierarchies);
      }
    });
  }

  public toHierarchies(): ClosureTableHierarchies<K> {
    const hierarchies: MutableProject<K, MutableAddress<K>> = MutableProject.empty<K, MutableAddress<K>>();

    this.retrieve(this.root, hierarchies);

    return ClosureTableHierarchies.of<K>(hierarchies);
  }
}
