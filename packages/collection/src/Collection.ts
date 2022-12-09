import { BinaryPredicate, ForEach, Mapping, Nominative, Nullable } from '@jamashita/anden-type';

export interface Collection<out K, out V> extends Nominative, Iterable<[K, V]> {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  filter<W extends V>(predicate: BinaryPredicate<W, K>): Collection<K, W>;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  forEach(foreach: ForEach<K, V>): void;

  get(key: K): Nullable<V>;

  isEmpty(): boolean;

  map<W>(mapping: Mapping<V, W>): Collection<K, W>;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
