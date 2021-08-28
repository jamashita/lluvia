import { Objet } from '@jamashita/anden-object';
import { BinaryPredicate, Catalogue, Mapper, Nullable } from '@jamashita/anden-type';
import { Collection } from './Collection';

export abstract class Quantity<K, V, N extends string = string> extends Objet<N> implements Collection<K, V, N> {
  protected constructor() {
    super();
  }

  public abstract iterator(): Iterator<[K, V]>;

  public abstract contains(value: V): boolean;

  public abstract every(predicate: BinaryPredicate<V, K>): boolean;

  public abstract filter(predicate: BinaryPredicate<V, K>): Collection<K, V>;

  public abstract find(predicate: BinaryPredicate<V, K>): Nullable<V>;

  public abstract forEach(catalogue: Catalogue<K, V>): void;

  public abstract get(key: K): Nullable<V>;

  public abstract map<W>(mapper: Mapper<V, W>): Collection<K, W>;

  public abstract size(): number;

  public abstract some(predicate: BinaryPredicate<V, K>): boolean;

  public abstract values(): Iterable<V>;

  public [Symbol.iterator](): Iterator<[K, V]> {
    return this.iterator();
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }
}
