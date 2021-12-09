import { BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlyProject<K, V> extends Collection<K, V>, Cloneable<ReadonlyProject<K, V>> {
  filter(predicate: BinaryPredicate<V, K>): ReadonlyProject<K, V>;

  has(key: K): boolean;

  iterator(): IterableIterator<[K, V]>;

  keys(): Iterable<K>;

  map<W>(mapper: Mapper<V, W>): ReadonlyProject<K, W>;

  toMap(): Map<K, V>;
}
