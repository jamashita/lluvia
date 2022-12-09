import { BinaryPredicate, ForEach, Mapping, Nominative, Nullable } from '@jamashita/anden-type';

export type NarrowingBinaryPredicate<A1, B1 extends A1, A2> = (arg1: A1, arg2: A2) => arg1 is B1;

export interface Collection<out K, out V> extends Nominative, Iterable<[K, V]> {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Collection<K, W>;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  forEach(foreach: ForEach<K, V>): void;

  get(key: K): Nullable<V>;

  isEmpty(): boolean;

  map<W>(mapping: Mapping<V, W>): Collection<K, W>;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
