import type { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import type { NarrowingBinaryPredicate } from '../collection/index.js';
import type { ReadonlyAddress } from './ReadonlyAddress.js';

export interface Address<out V> extends ReadonlyAddress<V> {
  add(value: V): Address<V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): Address<W>;

  filter(predicate: BinaryPredicate<V, void>): Address<V>;

  map<W>(mapping: Mapping<V, W>): Address<W>;

  remove(value: V): Address<V>;
}
