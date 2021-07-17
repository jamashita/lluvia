import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlyProject } from './ReadonlyProject.js';

export interface Project<K, V, N extends string = string> extends ReadonlyProject<K, V, N> {
  filter(predicate: BinaryPredicate<V, K>): Project<K, V>;

  map<W>(mapper: Mapper<V, W>): Project<K, W>;

  remove(key: K): Project<K, V>;

  set(key: K, value: V): Project<K, V>;
}
