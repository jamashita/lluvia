import { ForEach, Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { TreeNode } from './TreeNode';

export interface Tree<out V> extends Nominative {
  contains(value: V): boolean;

  every(predicate: Predicate<V>): boolean;

  find(predicate: Predicate<V>): Nullable<TreeNode<V>>;

  forEach(foreach: ForEach<unknown, V>): void;

  getRoot(): TreeNode<V>;

  size(): number;

  some(predicate: Predicate<V>): boolean;

  values(): Iterable<V>;
}
