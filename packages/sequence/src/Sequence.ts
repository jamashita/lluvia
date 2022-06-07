import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { ReadonlySequence } from './ReadonlySequence';

export interface Sequence<in out V> extends ReadonlySequence<V> {
  add(value: V): Sequence<V>;

  filter(predicate: BinaryPredicate<V, number>): Sequence<V>;

  map<W>(mapping: Mapping<V, W>): Sequence<W>;

  remove(key: number): Sequence<V>;

  set(key: number, value: V): Sequence<V>;
}
