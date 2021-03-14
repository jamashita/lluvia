import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlyProject } from './ReadonlyProject';

export interface Project<K, V, N extends string = string> extends ReadonlyProject<K, V, N> {
  set(key: K, value: V): Project<K, V>;

  remove(key: K): Project<K, V>;

  map<W>(mapper: Mapper<V, W>): Project<K, W>;

  filter(predicate: BinaryPredicate<V, K>): Project<K, V>;

  iterator(): IterableIterator<[K, V]>;
}
