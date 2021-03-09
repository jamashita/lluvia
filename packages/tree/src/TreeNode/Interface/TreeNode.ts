import { ReadonlyTreeNode } from './ReadonlyTreeNode';

export interface TreeNode<V, N extends string = string> extends ReadonlyTreeNode<V, N> {
  append(node: TreeNode<V>): TreeNode<V>;
}
