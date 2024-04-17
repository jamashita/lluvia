import type { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import { type Collection, type NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import { AAddress } from './AAddress.js';
import { AddressUtil } from './AddressUtil.js';
import type { ReadonlyAddress } from './ReadonlyAddress.js';

export class ImmutableAddress<out V> extends AAddress<V> {
  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map());

  public static await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<ImmutableAddress<V>> {
    return AddressUtil.wait(address, (values: Set<V>) => {
      return ImmutableAddress.ofSet(values);
    });
  }

  public static empty<V>(): ImmutableAddress<V> {
    return ImmutableAddress.EMPTY as ImmutableAddress<V>;
  }

  public static of<V>(collection: Collection<unknown, V>): ImmutableAddress<V> {
    const set: Set<V> = new Set(collection.values());

    return ImmutableAddress.ofSet(set);
  }

  private static ofInternal<V>(address: Map<V | string, V>): ImmutableAddress<V> {
    if (address.size === 0) {
      return ImmutableAddress.empty();
    }

    return new ImmutableAddress(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V> {
    const m: Map<V | string, V> = new Map();

    for (const v of set) {
      m.set(Quantity.genKey(v), v);
    }

    return ImmutableAddress.ofInternal(m);
  }

  protected constructor(address: Map<V | string, V>) {
    super(address);
  }

  public add(value: V): ImmutableAddress<V> {
    if (this.contains(value)) {
      return this;
    }

    const m: Map<V | string, V> = new Map(this.address);

    m.set(Quantity.genKey(value), value);

    return ImmutableAddress.ofInternal(m);
  }

  public duplicate(): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return ImmutableAddress.empty();
    }

    return ImmutableAddress.ofInternal(new Map(this.address));
  }

  public filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ImmutableAddress<W>;
  public filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V>;
  public filter<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, void>): ImmutableAddress<W> {
    return ImmutableAddress.ofInternal(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableAddress.empty()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapping: Mapping<V, W>): ImmutableAddress<W> {
    return ImmutableAddress.ofInternal(this.mapInternal(mapping));
  }

  public remove(value: V): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    const m: Map<V | string, V> = new Map(this.address);

    m.delete(Quantity.genKey(value));

    return ImmutableAddress.ofInternal(m);
  }
}
