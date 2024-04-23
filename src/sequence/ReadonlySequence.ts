import type { BinaryFunction, BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden/type';
import type { Collection, NarrowingBinaryPredicate } from '../collection/index.js';

export interface ReadonlySequence<out V> extends Collection<number, V>, Cloneable<ReadonlySequence<V>> {
  chunk(size: number): ReadonlySequence<ReadonlySequence<V>>;

  filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ReadonlySequence<W>;

  map<W>(mapping: Mapping<V, W>): ReadonlySequence<W>;

  reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V;

  shuffle(): ReadonlySequence<V>;

  sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>;

  toArray(): Array<V>;
}
