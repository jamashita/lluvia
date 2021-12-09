import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { StructurableTreeObject } from '../StructurableTreeObject';
import { TreeID } from '../TreeID';
import { ATreeNode } from './ATreeNode';

export class StructurableTreeNode<K extends TreeID, V extends StructurableTreeObject<K>> extends ATreeNode<V, StructurableTreeNode<K, V>> {
  public static of<K extends TreeID, V extends StructurableTreeObject<K>>(node: StructurableTreeNode<K, V>): StructurableTreeNode<K, V> {
    return StructurableTreeNode.ofValue<K, V>(node.getValue(), node.getChildren());
  }

  public static ofValue<K extends TreeID, V extends StructurableTreeObject<K>>(value: V, children?: ReadonlyAddress<StructurableTreeNode<K, V>>): StructurableTreeNode<K, V> {
    return new StructurableTreeNode<K, V>(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<K, V>> = ImmutableAddress.empty<StructurableTreeNode<K, V>>()) {
    super(value, ImmutableAddress.of<StructurableTreeNode<K, V>>(children));
  }

  public append(node: StructurableTreeNode<K, V>): StructurableTreeNode<K, V> {
    this.children = this.children.add(node);

    return this;
  }

  protected forge(node: ATreeNode<V, StructurableTreeNode<K, V>>): StructurableTreeNode<K, V> {
    if (node instanceof StructurableTreeNode) {
      return node as StructurableTreeNode<K, V>;
    }

    return StructurableTreeNode.ofValue<K, V>(node.getValue(), node.getChildren());
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
