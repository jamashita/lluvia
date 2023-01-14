import { BinaryPredicate, ForEach, Mapping, Nominative, Nullable } from '@jamashita/anden/type';

export type NarrowingBinaryPredicate<A1, B1 extends A1, A2> = (arg1: A1, arg2: A2) => arg1 is B1;

export interface Collection<out K, out V> extends Nominative, Iterable<[K, V]> {
  [Symbol.iterator](): IterableIterator<[K, V]>;

  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Collection<K, W>;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nullable<W>;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  forEach(foreach: ForEach<K, V>): void;

  get(key: K): Nullable<V>;

  isEmpty(): boolean;

  iterator(): IterableIterator<[K, V]>;

  map<W>(mapping: Mapping<V, W>): Collection<K, W>;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): IterableIterator<V>;
}
