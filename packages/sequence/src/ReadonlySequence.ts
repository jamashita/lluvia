import { BinaryFunction, BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlySequence<V> extends Collection<number, V>, Cloneable<ReadonlySequence<V>> {
  filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<V>;

  iterator(): IterableIterator<[number, V]>;

  map<W>(mapping: Mapping<V, W>): ReadonlySequence<W>;

  reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V;

  sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>;

  toArray(): Array<V>;
}
