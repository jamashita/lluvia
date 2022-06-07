import { BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlyAddress<in out V> extends Collection<void, V>, Cloneable<ReadonlyAddress<V>> {
  filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>;

  iterator(): IterableIterator<[void, V]>;

  map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>;

  toSet(): Set<V>;
}
