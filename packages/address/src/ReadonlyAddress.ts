import { BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden-type';
import { Collection, NarrowingBinaryPredicate } from '@jamashita/lluvia-collection';

export interface ReadonlyAddress<out V> extends Collection<void, V>, Cloneable<ReadonlyAddress<V>> {
  filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>;

  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyAddress<W>;

  iterator(): IterableIterator<[void, V]>;

  map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>;

  toSet(): Set<V>;
}
