import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { NarrowingBinaryPredicate } from '@jamashita/lluvia-collection';
import { ReadonlySequence } from './ReadonlySequence';

export interface Sequence<out V> extends ReadonlySequence<V> {
  add(value: V): Sequence<V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): Sequence<W>;

  filter(predicate: BinaryPredicate<V, number>): Sequence<V>;

  map<W>(mapping: Mapping<V, W>): Sequence<W>;

  remove(key: number): Sequence<V>;

  set(key: number, value: V): Sequence<V>;
}
