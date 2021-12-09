import { BinaryFunction, BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlySequence<V> extends Collection<number, V>, Cloneable<ReadonlySequence<V>> {
  filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<V>;

  iterator(): IterableIterator<[number, V]>;

  map<W>(mapper: Mapper<V, W>): ReadonlySequence<W>;

  sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>;

  toArray(): Array<V>;
}
