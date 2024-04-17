import type { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import { type Collection, type NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import { AAddress } from './AAddress.js';
import { AddressUtil } from './AddressUtil.js';
import type { ReadonlyAddress } from './ReadonlyAddress.js';

export class MutableAddress<out V> extends AAddress<V> {
  public static await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<MutableAddress<V>> {
    return AddressUtil.wait(address, (values: Set<V>) => {
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

    for (const v of set) {
      m.set(Quantity.genKey(v), v);
    }

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

  public filter<W extends V>(predicate: BinaryPredicate<W, void>): MutableAddress<W>;
  public filter(predicate: BinaryPredicate<V, void>): MutableAddress<V>;
  public filter<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, void>): MutableAddress<V> {
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
