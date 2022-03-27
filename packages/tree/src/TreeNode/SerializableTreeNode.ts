import { JSONable, ObjectLiteral } from '@jamashita/anden-type';
import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { SerializableTreeObject } from '../SerializableTreeObject';
import { ATreeNode } from './ATreeNode';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class SerializableTreeNode<V extends SerializableTreeObject> extends ATreeNode<V, SerializableTreeNode<V>> implements JSONable<TreeNodeJSON> {
  public static of<V extends SerializableTreeObject>(node: SerializableTreeNode<V>): SerializableTreeNode<V> {
    return new SerializableTreeNode(node.getValue(), node.getChildren());
  }

  public static ofValue<V extends SerializableTreeObject>(value: V, children?: ReadonlyAddress<SerializableTreeNode<V>>): SerializableTreeNode<V> {
    return new SerializableTreeNode(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<SerializableTreeNode<V>> = ImmutableAddress.empty<SerializableTreeNode<V>>()) {
    super(value, ImmutableAddress.of(children));
  }

  public append(node: SerializableTreeNode<V>): this {
    this.children = this.children.add(node);

    return this;
  }

  protected forge(node: ATreeNode<V, SerializableTreeNode<V>>): SerializableTreeNode<V> {
    if (node instanceof SerializableTreeNode) {
      return node as SerializableTreeNode<V>;
    }

    return SerializableTreeNode.ofValue(node.getValue(), node.getChildren());
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
