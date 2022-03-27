import { ReadonlyTreeNode } from './ReadonlyTreeNode';

export interface TreeNode<V> extends ReadonlyTreeNode<V> {
  append(node: TreeNode<V>): TreeNode<V>;
}
