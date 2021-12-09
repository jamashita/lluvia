import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class MutableAddress<V> extends AAddress<V, MutableAddress<V>> {
  public static empty<V>(): MutableAddress<V> {
    return MutableAddress.ofInternal<V>(new Map<V | number, V>());
  }

  public static of<V>(collection: Collection<unknown, V>): MutableAddress<V> {
    const set: Set<V> = new Set<V>(collection.values());

    return MutableAddress.ofSet<V>(set);
  }

  private static ofInternal<V>(address: Map<V | number, V>): MutableAddress<V> {
    return new MutableAddress<V>(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): MutableAddress<V> {
    const m: Map<V | number, V> = new Map<V | number, V>();

    set.forEach((v: V) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return MutableAddress.ofInternal<V>(m);
  }

  protected constructor(address: Map<V | number, V>) {
    super(address);
  }

  public add(value: V): MutableAddress<V> {
    if (this.contains(value)) {
      return this;
    }

    const v: V | number = this.hashor<V>(value);

    this.address.set(v, value);

    return this;
  }

  public duplicate(): MutableAddress<V> {
    return MutableAddress.ofInternal<V>(new Map<V | number, V>(this.address));
  }

  public filter(predicate: BinaryPredicate<V, void>): MutableAddress<V> {
    return MutableAddress.ofInternal<V>(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableAddress<W> {
    return MutableAddress.ofInternal<W>(this.mapInternal<W>(mapper));
  }

  public remove(value: V): MutableAddress<V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    const v: V | number = this.hashor<V>(value);

    this.address.delete(v);

    return this;
  }
}
