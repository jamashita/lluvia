import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { ReadonlyAddress } from './ReadonlyAddress';

export interface Address<V> extends ReadonlyAddress<V> {
  add(value: V): Address<V>;

  filter(predicate: BinaryPredicate<V, void>): Address<V>;

  map<W>(mapper: Mapper<V, W>): Address<W>;

  remove(value: V): Address<V>;
}
