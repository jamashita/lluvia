import type { BinaryPredicate, Cloneable, Mapping } from '@jamashita/anden/type';
import type { Collection, NarrowingBinaryPredicate } from '../collection/index.js';

export interface ReadonlyAddress<out V> extends Collection<void, V>, Cloneable<ReadonlyAddress<V>> {
  filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyAddress<W>;

  filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>;

  get(): null;

  has(value: V): boolean;

  map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>;

  toSet(): Set<V>;
}
