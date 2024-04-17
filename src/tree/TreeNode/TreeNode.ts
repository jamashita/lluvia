import type { Nominative, Nullable, Predicate } from '@jamashita/anden/type';
import type { Address } from '../../address/index.js';

export interface TreeNode<out V> extends Nominative {
  append(node: TreeNode<V>): void;

  contains(value: V): boolean;

  find(predicate: Predicate<V>): Nullable<TreeNode<V>>;

  getChildren(): Address<TreeNode<V>>;

  getValue(): V;

  isLeaf(): boolean;

  size(): number;

  values(): Iterable<V>;
}
