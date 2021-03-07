import { BinaryPredicate, Cloneable, Mapper } from '@jamashita/anden-type';
import { Collection } from '../../Interface/Collection';

export interface ReadonlyAddress<V, N extends string = string> extends Collection<void, V, N>, Cloneable<ReadonlyAddress<V>> {
  map<W>(mapper: Mapper<V, W>): ReadonlyAddress<W>;

  filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>;

  toSet(): Set<V>;
}
