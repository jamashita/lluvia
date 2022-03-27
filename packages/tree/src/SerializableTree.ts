import { JSONable } from '@jamashita/anden-type';
import { ATree } from './ATree';
import { SerializableTreeObject } from './SerializableTreeObject';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode';

export class SerializableTree<V extends SerializableTreeObject> extends ATree<V, SerializableTreeNode<V>> implements JSONable<TreeNodeJSON> {
  public static of<V extends SerializableTreeObject>(root: SerializableTreeNode<V>): SerializableTree<V> {
    return new SerializableTree(root);
  }

  protected constructor(root: SerializableTreeNode<V>) {
    super(root);
  }

  public toJSON(): TreeNodeJSON {
    return this.root.toJSON();
  }
}
