import { Address, MutableAddress, ReadonlyAddress } from '../../address/index.js';
import { StructurableTreeObject } from '../StructurableTreeObject.js';
import { TreeID } from '../TreeID.js';
import { ATreeNode } from './ATreeNode.js';
import { TreeNode } from './TreeNode.js';

export class StructurableTreeNode<out K extends TreeID, out V extends StructurableTreeObject<K>> extends ATreeNode<V, StructurableTreeNode<K, V>> {
  public static of<K extends TreeID, V extends StructurableTreeObject<K>>(node: StructurableTreeNode<K, V>): StructurableTreeNode<K, V> {
    return StructurableTreeNode.ofValue<K, V>(node.getValue(), node.getChildren());
  }

  public static ofValue<K extends TreeID, V extends StructurableTreeObject<K>>(value: V, children: ReadonlyAddress<StructurableTreeNode<K, V>> = MutableAddress.empty()): StructurableTreeNode<K, V> {
    return new StructurableTreeNode(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<K, V>>) {
    super(value, MutableAddress.of(children));
  }

  protected forge(node: TreeNode<V>): StructurableTreeNode<K, V> {
    if (node instanceof StructurableTreeNode) {
      return node as StructurableTreeNode<K, V>;
    }

    const children: Address<StructurableTreeNode<K, V>> = node.getChildren().map((t: TreeNode<V>): StructurableTreeNode<K, V> => {
      return this.forge(t);
    });

    return StructurableTreeNode.ofValue(node.getValue(), children);
  }

  public getTreeID(): K {
    return this.value.getTreeID();
  }

  public has(key: K): boolean {
    if (this.getTreeID().equals(key)) {
      return true;
    }

    return this.children.some((child: StructurableTreeNode<K, V>) => {
      return child.has(key);
    });
  }
}
