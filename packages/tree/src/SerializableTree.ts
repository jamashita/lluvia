import { JSONable } from '@jamashita/anden-type';
import { ATree } from './ATree.js';
import { SerializableTreeObject } from './SerializableTreeObject.js';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode.js';

export class SerializableTree<V extends SerializableTreeObject> extends ATree<V, SerializableTreeNode<V>, 'SerializableTree'> implements JSONable<TreeNodeJSON> {
  public readonly noun: 'SerializableTree' = 'SerializableTree';

  public static of<VT extends SerializableTreeObject>(root: SerializableTreeNode<VT>): SerializableTree<VT> {
    return new SerializableTree<VT>(root);
  }

  protected constructor(root: SerializableTreeNode<V>) {
    super(root);
  }

  public toJSON(): TreeNodeJSON {
    return this.root.toJSON();
  }
}
