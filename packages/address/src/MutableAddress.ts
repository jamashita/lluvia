import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class MutableAddress<V> extends AAddress<V, MutableAddress<V>> {
  public static empty<V>(): MutableAddress<V> {
    return MutableAddress.ofInternal<V>(new Map());
  }

  public static of<V>(collection: Collection<unknown, V>): MutableAddress<V> {
    const set: Set<V> = new Set(collection.values());

    return MutableAddress.ofSet(set);
  }

  private static ofInternal<V>(address: Map<V | number, V>): MutableAddress<V> {
    return new MutableAddress(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): MutableAddress<V> {
    const m: Map<V | number, V> = new Map();

    set.forEach((v: V) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return MutableAddress.ofInternal(m);
  }

  protected constructor(address: Map<V | number, V>) {
    super(address);
  }

  public add(value: V): this {
    if (this.contains(value)) {
      return this;
    }

    if (isNominative(value)) {
      this.address.set(value.hashCode(), value);
    }
    else {
      this.address.set(value, value);
    }

    return this;
  }

  public duplicate(): MutableAddress<V> {
    return MutableAddress.ofInternal(new Map(this.address));
  }

  public filter(predicate: BinaryPredicate<V, void>): MutableAddress<V> {
    return MutableAddress.ofInternal(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableAddress<W> {
    return MutableAddress.ofInternal(this.mapInternal(mapper));
  }

  public remove(value: V): this {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    if (isNominative(value)) {
      this.address.delete(value.hashCode());
    }
    else {
      this.address.delete(value);
    }

    return this;
  }
}
