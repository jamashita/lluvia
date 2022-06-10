import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { ReadonlyAddress } from './ReadonlyAddress';

export interface Address<out V> extends ReadonlyAddress<V> {
  add(value: V): Address<V>;

  filter(predicate: BinaryPredicate<V, void>): Address<V>;

  map<W>(mapping: Mapping<V, W>): Address<W>;

  remove(value: V): Address<V>;
}
