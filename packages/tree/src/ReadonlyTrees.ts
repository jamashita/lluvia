import { BinaryPredicate, Catalogue, Nominative, Nullable } from '@jamashita/anden-type';
import { Tree } from './Tree.js';
import { TreeNode } from './TreeNode/TreeNode.js';

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
