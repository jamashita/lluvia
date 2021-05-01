import { BinaryPredicate, Catalogue, Nominative, Nullable } from '@jamashita/anden-type';
import { TreeNode } from '../TreeNode/Interface/TreeNode';
import { Tree } from './Tree';

export interface ReadonlyTrees<K, V, E extends Tree<V>, N extends string = string> extends Nominative<N> {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  find(predicate: BinaryPredicate<V, K>): Nullable<TreeNode<V>>;

  forEach(catalogue: Catalogue<K, V>): void;

  get(key: K): Nullable<E>;

  isEmpty(): boolean;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
