import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class MutableAddress<V> extends AAddress<V, MutableAddress<V>, 'MutableAddress'> {
  public readonly noun: 'MutableAddress' = 'MutableAddress';

  public static empty<VT>(): MutableAddress<VT> {
    return MutableAddress.ofInternal<VT>(new Map<VT | number, VT>());
  }

  public static of<VT>(collection: Collection<unknown, VT>): MutableAddress<VT> {
    const set: Set<VT> = new Set<VT>(collection.values());

    return MutableAddress.ofSet<VT>(set);
  }

  private static ofInternal<VT>(address: Map<VT | number, VT>): MutableAddress<VT> {
    return new MutableAddress<VT>(address);
  }

  public static ofSet<VT>(set: ReadonlySet<VT>): MutableAddress<VT> {
    const m: Map<VT | number, VT> = new Map<VT | number, VT>();

    set.forEach((v: VT) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return MutableAddress.ofInternal<VT>(m);
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
