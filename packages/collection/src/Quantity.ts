import { Objet } from '@jamashita/anden-object';
import { BinaryPredicate, Enumerator, Mapper, Nullable } from '@jamashita/anden-type';
import { Collection } from './Interface/Collection';

export abstract class Quantity<K, V, N extends string = string> extends Objet<N> implements Collection<K, V, N> {
  protected constructor() {
    super();
  }

  public abstract iterator(): Iterator<[K, V]>;

  public [Symbol.iterator](): Iterator<[K, V]> {
    return this.iterator();
  }

  public abstract get(key: K): Nullable<V>;

  public abstract contains(value: V): boolean;

  public abstract size(): number;

  public abstract isEmpty(): boolean;

  public abstract forEach(iteration: Enumerator<K, V>): void;

  public abstract every(predicate: BinaryPredicate<V, K>): boolean;

  public abstract some(predicate: BinaryPredicate<V, K>): boolean;

  public abstract values(): Iterable<V>;

  public abstract filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  public abstract find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  public abstract map<W>(mapper: Mapper<V, W>): Collection<K, W>;
}
