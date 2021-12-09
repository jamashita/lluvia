import { Catalogue, Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { TreeNode } from './TreeNode/TreeNode';

export interface Tree<V> extends Nominative {
  contains(value: V): boolean;

  every(predicate: Predicate<V>): boolean;

  find(predicate: Predicate<V>): Nullable<TreeNode<V>>;

  forEach(catalogue: Catalogue<unknown, V>): void;

  getRoot(): TreeNode<V>;

  size(): number;

  some(predicate: Predicate<V>): boolean;

  values(): Iterable<V>;
}
