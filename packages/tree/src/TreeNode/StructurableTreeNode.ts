import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-collection';
import { StructurableTreeObject } from '../Interface/StructurableTreeObject';
import { TreeID } from '../Interface/TreeID';
import { ATreeNode } from './Abstract/ATreeNode';

export class StructurableTreeNode<K extends TreeID, V extends StructurableTreeObject<K>> extends ATreeNode<V, StructurableTreeNode<K, V>, 'StructurableTreeNode'> {
  public readonly noun: 'StructurableTreeNode' = 'StructurableTreeNode';

  public static of<KT extends TreeID, VT extends StructurableTreeObject<KT>>(node: StructurableTreeNode<KT, VT>): StructurableTreeNode<KT, VT> {
    return StructurableTreeNode.ofValue<KT, VT>(node.getValue(), node.getChildren());
  }

  public static ofValue<KT extends TreeID, VT extends StructurableTreeObject<KT>>(value: VT, children?: ReadonlyAddress<StructurableTreeNode<KT, VT>>): StructurableTreeNode<KT, VT> {
    return new StructurableTreeNode<KT, VT>(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<K, V>> = ImmutableAddress.empty<StructurableTreeNode<K, V>>()) {
    super(value, ImmutableAddress.of<StructurableTreeNode<K, V>>(children));
  }

  protected forge(node: ATreeNode<V, StructurableTreeNode<K, V>>): StructurableTreeNode<K, V> {
    if (node instanceof StructurableTreeNode) {
      return node as StructurableTreeNode<K, V>;
    }

    return StructurableTreeNode.ofValue<K, V>(node.getValue(), node.getChildren());
  }

  public append(node: StructurableTreeNode<K, V>): StructurableTreeNode<K, V> {
    this.children = this.children.add(node);

    return this;
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
