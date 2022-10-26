import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { ReadonlyDictionary } from './ReadonlyDictionary';

export interface Dictionary<out K, out V> extends ReadonlyDictionary<K, V> {
  filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>;

  map<W>(mapping: Mapping<V, W>): Dictionary<K, W>;

  remove(key: K): Dictionary<K, V>;

  set(key: K, value: V): Dictionary<K, V>;
}
