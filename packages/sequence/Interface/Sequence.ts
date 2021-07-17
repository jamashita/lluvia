import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlySequence } from './ReadonlySequence.js';

export interface Sequence<V, N extends string = string> extends ReadonlySequence<V, N> {
  add(value: V): Sequence<V>;

  filter(predicate: BinaryPredicate<V, number>): Sequence<V>;

  map<W>(mapper: Mapper<V, W>): Sequence<W>;

  remove(key: number): Sequence<V>;

  set(key: number, value: V): Sequence<V>;
}
