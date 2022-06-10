import { BinaryPredicate, ForEach, Nominative, Nullable } from '@jamashita/anden-type';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode';

export interface ReadonlyTrees<out K, out V, E extends Tree<V>> extends Nominative {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  find(predicate: BinaryPredicate<V, K>): Nullable<TreeNode<V>>;

  forEach(foreach: ForEach<K, V>): void;

  get(key: K): Nullable<E>;

  isEmpty(): boolean;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
