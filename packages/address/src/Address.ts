import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlyAddress } from './ReadonlyAddress.js';

export interface Address<V, N extends string = string> extends ReadonlyAddress<V, N> {
  add(value: V): Address<V>;

  filter(predicate: BinaryPredicate<V, void>): Address<V>;

  map<W>(mapper: Mapper<V, W>): Address<W>;

  remove(value: V): Address<V>;
}
