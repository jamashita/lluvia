import { Objet } from '@jamashita/anden/object';
import { type BinaryPredicate, type ForEach, isNominative, type Mapping, type Nullable } from '@jamashita/anden/type';
import type { Collection, NarrowingBinaryPredicate } from './Collection.js';

export abstract class Quantity<out K, out V> extends Objet implements Collection<K, V> {
  protected static genKey<T>(key: T): T | string {
    if (isNominative(key)) {
      return key.hashCode();
    }

    return key;
  }

  protected constructor() {
    super();
  }

  public abstract contains(value: V): boolean;

  public abstract every(predicate: BinaryPredicate<V, K>): boolean;

  public abstract filter<W extends V>(predicate: BinaryPredicate<W, K>): Collection<K, W>;

  public abstract filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  public abstract find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nullable<W>;

  public abstract find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  public abstract forEach(foreach: ForEach<K, V>): void;

  public abstract get(key: K): Nullable<V>;

  public abstract iterator(): IterableIterator<[K, V]>;

  public abstract map<W>(mapping: Mapping<V, W>): Collection<K, W>;

  public abstract size(): number;

  public abstract some(predicate: BinaryPredicate<V, K>): boolean;

  public abstract values(): IterableIterator<V>;

  public [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.iterator();
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }
}
