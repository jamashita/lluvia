import { BinaryPredicate, Enumerator, Mapper, Nominative, Nullable } from '@jamashita/anden-type';

export interface Collection<K, V, N extends string = string> extends Nominative<N>, Iterable<[K, V]> {
  get(key: K): Nullable<V>;

  contains(value: V): boolean;

  size(): number;

  isEmpty(): boolean;

  forEach(iteration: Enumerator<K, V>): void;

  every(predicate: BinaryPredicate<V, K>): boolean;

  some(predicate: BinaryPredicate<V, K>): boolean;

  find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  map<W>(mapper: Mapper<V, W>): Collection<K, W>;

  filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  values(): Iterable<V>;
}
