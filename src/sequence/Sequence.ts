import type { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import type { NarrowingBinaryPredicate } from '../collection/index.js';
import type { ReadonlySequence } from './ReadonlySequence.js';

export interface Sequence<out V> extends ReadonlySequence<V> {
  add(value: V): Sequence<V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): Sequence<W>;

  filter(predicate: BinaryPredicate<V, number>): Sequence<V>;

  map<W>(mapping: Mapping<V, W>): Sequence<W>;

  remove(key: number): Sequence<V>;

  set(key: number, value: V): Sequence<V>;
}
