import { JSONable, ObjectLiteral } from '@jamashita/anden/type';
import { Address, MutableAddress, ReadonlyAddress } from '../../address/index.js';
import { SerializableTreeObject } from '../SerializableTreeObject.js';
import { ATreeNode } from './ATreeNode.js';
import { TreeNode } from './TreeNode.js';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class SerializableTreeNode<out V extends SerializableTreeObject> extends ATreeNode<V, SerializableTreeNode<V>> implements JSONable<TreeNodeJSON> {
  public static of<V extends SerializableTreeObject>(node: SerializableTreeNode<V>): SerializableTreeNode<V> {
    return new SerializableTreeNode(node.getValue(), node.getChildren());
  }

  public static ofValue<V extends SerializableTreeObject>(value: V, children: ReadonlyAddress<SerializableTreeNode<V>> = MutableAddress.empty()): SerializableTreeNode<V> {
    return new SerializableTreeNode(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<SerializableTreeNode<V>>) {
    super(value, MutableAddress.of(children));
  }

  protected forge(node: TreeNode<V>): SerializableTreeNode<V> {
    if (node instanceof SerializableTreeNode) {
      return node as SerializableTreeNode<V>;
    }

    const children: Address<SerializableTreeNode<V>> = node.getChildren().map((t: TreeNode<V>): SerializableTreeNode<V> => {
      return this.forge(t);
    });

    return SerializableTreeNode.ofValue(node.getValue(), children);
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
