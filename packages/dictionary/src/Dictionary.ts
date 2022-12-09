import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { ReadonlyDictionary } from './ReadonlyDictionary';

export interface Dictionary<out K, out V> extends ReadonlyDictionary<K, V> {
  filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>;

  filter<W extends V>(predicate: BinaryPredicate<W, K>): Dictionary<K, W>;

  map<W>(mapping: Mapping<V, W>): Dictionary<K, W>;

  remove(key: K): Dictionary<K, V>;

  set(key: K, value: V): Dictionary<K, V>;
}
