import { Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { Address } from '@jamashita/lluvia-address/src/index';

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
