import { BinaryFunction, BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '../../Interface/Collection.js';

export interface ReadonlySequence<V, N extends string = string> extends Collection<number, V, N>, Cloneable<ReadonlySequence<V>> {
  filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<V>;

  iterator(): IterableIterator<[number, V]>;

  map<W>(mapper: Mapper<V, W>): ReadonlySequence<W>;

  sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>;

  toArray(): Array<V>;
}
