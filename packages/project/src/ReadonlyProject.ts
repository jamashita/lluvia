import { BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlyProject<out K, out V> extends Collection<K, V>, Cloneable<ReadonlyProject<K, V>> {
  filter(predicate: BinaryPredicate<V, K>): ReadonlyProject<K, V>;

  has(key: K): boolean;

  iterator(): IterableIterator<[K, V]>;

  keys(): Iterable<K>;

  map<W>(mapping: Mapping<V, W>): ReadonlyProject<K, W>;

  toMap(): Map<K, V>;
}
