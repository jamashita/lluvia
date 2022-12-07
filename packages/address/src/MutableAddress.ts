import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';
import { AddressUtil } from './AddressUtil';
import { ReadonlyAddress } from './ReadonlyAddress';

export class MutableAddress<out V> extends AAddress<V> {
  public static await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<MutableAddress<V>> {
    return AddressUtil.await(address, (values: Set<V>) => {
      return MutableAddress.ofSet(values);
    });
  }

  public static empty<V>(): MutableAddress<V> {
    return MutableAddress.ofInternal<V>(new Map());
  }

  public static of<V>(collection: Collection<unknown, V>): MutableAddress<V> {
    const set: Set<V> = new Set(collection.values());

    return MutableAddress.ofSet(set);
  }

  private static ofInternal<V>(address: Map<V | string, V>): MutableAddress<V> {
    return new MutableAddress(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): MutableAddress<V> {
    const m: Map<V | string, V> = new Map();

    set.forEach((v: V) => {
      m.set(Quantity.genKey(v), v);
    });

    return MutableAddress.ofInternal(m);
  }

  protected constructor(address: Map<V | string, V>) {
    super(address);
  }

  public add(value: V): this {
    if (this.contains(value)) {
      return this;
    }

    this.address.set(Quantity.genKey(value), value);

    return this;
  }

  public duplicate(): MutableAddress<V> {
    return MutableAddress.ofInternal(new Map(this.address));
  }

  public filter(predicate: BinaryPredicate<V, void>): MutableAddress<V> {
    return MutableAddress.ofInternal(this.filterInternal(predicate));
  }

  public map<W>(mapping: Mapping<V, W>): MutableAddress<W> {
    return MutableAddress.ofInternal(this.mapInternal(mapping));
  }

  public remove(value: V): this {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    this.address.delete(Quantity.genKey(value));

    return this;
  }
}
