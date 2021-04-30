import { Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { TreeNode } from '../TreeNode/Interface/TreeNode';

export interface Tree<V, N extends string = string> extends Nominative<N> {
  contains(value: V): boolean;

  every(predicate: Predicate<V>): boolean;

  find(predicate: Predicate<V>): Nullable<TreeNode<V>>;

  forEach(enumerator: Enumerator<unknown, V>): void;

  getRoot(): TreeNode<V>;

  size(): number;

  some(predicate: Predicate<V>): boolean;

  values(): Iterable<V>;
}
