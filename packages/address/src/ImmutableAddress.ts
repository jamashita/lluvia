import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class ImmutableAddress<in out V> extends AAddress<V> {
  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map());

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

    set.forEach((v: V) => {
      m.set(Quantity.genKey(v), v);
    });

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

  public filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V> {
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
