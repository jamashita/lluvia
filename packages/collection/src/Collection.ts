import { BinaryPredicate, Catalogue, Mapper, Nominative, Nullable } from '@jamashita/anden-type';

export interface Collection<K, V> extends Nominative, Iterable<[K, V]> {
  contains(value: V): boolean;

  every(predicate: BinaryPredicate<V, K>): boolean;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  forEach(catalogue: Catalogue<K, V>): void;

  get(key: K): Nullable<V>;

  isEmpty(): boolean;

  map<W>(mapper: Mapper<V, W>): Collection<K, W>;

  size(): number;

  some(predicate: BinaryPredicate<V, K>): boolean;

  values(): Iterable<V>;
}
