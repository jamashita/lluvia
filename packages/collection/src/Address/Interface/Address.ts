import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlyAddress } from './ReadonlyAddress';

export interface Address<V, N extends string = string> extends ReadonlyAddress<V, N> {
  add(value: V): Address<V, N>;

  remove(value: V): Address<V, N>;

  map<W>(mapper: Mapper<V, W>): Address<W>;

  filter(predicate: BinaryPredicate<V, void>): Address<V>;

  iterator(): IterableIterator<[void, V]>;
}
