import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { ReadonlyProject } from './ReadonlyProject';

export interface Project<K, V> extends ReadonlyProject<K, V> {
  filter(predicate: BinaryPredicate<V, K>): Project<K, V>;

  map<W>(mapping: Mapping<V, W>): Project<K, W>;

  remove(key: K): Project<K, V>;

  set(key: K, value: V): Project<K, V>;
}
