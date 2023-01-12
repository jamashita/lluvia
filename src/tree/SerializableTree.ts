import { JSONifiable } from '@jamashita/anden/type';
import { ATree } from './ATree.js';
import { SerializableTreeObject } from './SerializableTreeObject.js';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/index.js';

export class SerializableTree<out V extends SerializableTreeObject> extends ATree<V, SerializableTreeNode<V>> implements JSONifiable<TreeNodeJSON> {
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
