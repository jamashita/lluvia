import { BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '../../Interface/Collection';

export interface ReadonlyProject<K, V, N extends string = string> extends Collection<K, V, N>, Cloneable<ReadonlyProject<K, V>> {
  filter(predicate: BinaryPredicate<V, K>): ReadonlyProject<K, V>;

  has(key: K): boolean;

  iterator(): IterableIterator<[K, V]>;

  keys(): Iterable<K>;

  map<W>(mapper: Mapper<V, W>): ReadonlyProject<K, W>;

  toMap(): Map<K, V>;
}
