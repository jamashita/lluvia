import { JSONable, ObjectLiteral } from '@jamashita/anden-type';
import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { SerializableTreeObject } from '../SerializableTreeObject.js';
import { ATreeNode } from './ATreeNode.js';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class SerializableTreeNode<V extends SerializableTreeObject> extends ATreeNode<V, SerializableTreeNode<V>, 'SerializableTreeNode'>
  implements JSONable<TreeNodeJSON> {
  public readonly noun: 'SerializableTreeNode' = 'SerializableTreeNode';

  public static of<VT extends SerializableTreeObject>(node: SerializableTreeNode<VT>): SerializableTreeNode<VT> {
    return new SerializableTreeNode<VT>(node.getValue(), node.getChildren());
  }

  public static ofValue<VT extends SerializableTreeObject>(value: VT, children?: ReadonlyAddress<SerializableTreeNode<VT>>): SerializableTreeNode<VT> {
    return new SerializableTreeNode<VT>(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<SerializableTreeNode<V>> = ImmutableAddress.empty<SerializableTreeNode<V>>()) {
    super(value, ImmutableAddress.of<SerializableTreeNode<V>>(children));
  }

  public append(node: SerializableTreeNode<V>): SerializableTreeNode<V> {
    this.children = this.children.add(node);

    return this;
  }

  protected forge(node: ATreeNode<V, SerializableTreeNode<V>>): SerializableTreeNode<V> {
    if (node instanceof SerializableTreeNode) {
      return node as SerializableTreeNode<V>;
    }

    return SerializableTreeNode.ofValue<V>(node.getValue(), node.getChildren());
  }

  public toJSON(): TreeNodeJSON {
    const children: Array<ObjectLiteral> = [];

    this.children.forEach((child: SerializableTreeNode<V>) => {
      children.push(child.toJSON());
    });

    return {
      value: this.value.toJSON(),
      children
    };
  }
}
