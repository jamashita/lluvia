import { Enumerator, Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { TreeNode } from '../TreeNode/Interface/TreeNode';

export interface Tree<V, N extends string = string> extends Nominative<N> {
  getRoot(): TreeNode<V>;

  contains(value: V): boolean;

  every(predicate: Predicate<V>): boolean;

  forEach(enumerator: Enumerator<unknown, V>): void;

  find(predicate: Predicate<V>): Nullable<TreeNode<V>>;

  size(): number;

  some(predicate: Predicate<V>): boolean;

  values(): Iterable<V>;
}
