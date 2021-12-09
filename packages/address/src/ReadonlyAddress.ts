import { BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';

export interface ReadonlyAddress<V> extends Collection<void, V>, Cloneable<ReadonlyAddress<V>> {
  filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>;

  iterator(): IterableIterator<[void, V]>;

  map<W>(mapper: Mapper<V, W>): ReadonlyAddress<W>;

  toSet(): Set<V>;
}
