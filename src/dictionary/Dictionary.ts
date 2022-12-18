import { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import { NarrowingBinaryPredicate } from '../collection/index.js';
import { ReadonlyDictionary } from './ReadonlyDictionary.js';

export interface Dictionary<out K, out V> extends ReadonlyDictionary<K, V> {
  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Dictionary<K, W>;

  filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>;

  map<W>(mapping: Mapping<V, W>): Dictionary<K, W>;

  remove(key: K): Dictionary<K, V>;

  set(key: K, value: V): Dictionary<K, V>;
}
