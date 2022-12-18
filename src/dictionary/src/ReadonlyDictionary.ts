import { BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden-type';
import { Collection, NarrowingBinaryPredicate } from '@jamashita/lluvia-collection';

export interface ReadonlyDictionary<out K, out V> extends Collection<K, V>, Cloneable<ReadonlyDictionary<K, V>> {
  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ReadonlyDictionary<K, W>;

  filter(predicate: BinaryPredicate<V, K>): ReadonlyDictionary<K, V>;

  has(key: K): boolean;

  iterator(): IterableIterator<[K, V]>;

  keys(): Iterable<K>;

  map<W>(mapping: Mapping<V, W>): ReadonlyDictionary<K, W>;

  toMap(): Map<K, V>;
}
