import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class ImmutableAddress<V> extends AAddress<V, ImmutableAddress<V>> {
  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map<unknown, unknown>());

  public static empty<V>(): ImmutableAddress<V> {
    return ImmutableAddress.EMPTY as ImmutableAddress<V>;
  }

  public static of<V>(collection: Collection<unknown, V>): ImmutableAddress<V> {
    const set: Set<V> = new Set<V>(collection.values());

    return ImmutableAddress.ofSet<V>(set);
  }

  private static ofInternal<V>(address: Map<V | number, V>): ImmutableAddress<V> {
    if (address.size === 0) {
      return ImmutableAddress.empty<V>();
    }

    return new ImmutableAddress<V>(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V> {
    const m: Map<V | number, V> = new Map<V | number, V>();

    set.forEach((v: V) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return ImmutableAddress.ofInternal<V>(m);
  }

  protected constructor(address: Map<V | number, V>) {
    super(address);
  }

  public add(value: V): ImmutableAddress<V> {
    if (this.contains(value)) {
      return this;
    }

    const m: Map<V | number, V> = new Map<V | number, V>(this.address);
    const v: V | number = this.hashor<V>(value);

    m.set(v, value);

    return ImmutableAddress.ofInternal<V>(m);
  }

  public duplicate(): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return ImmutableAddress.empty<V>();
    }

    return ImmutableAddress.ofInternal<V>(new Map<V | number, V>(this.address));
  }

  public filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V> {
    return ImmutableAddress.ofInternal<V>(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableAddress.empty<V>()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableAddress<W> {
    return ImmutableAddress.ofInternal<W>(this.mapInternal<W>(mapper));
  }

  public remove(value: V): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    const m: Map<V | number, V> = new Map<V | number, V>(this.address);
    const v: V | number = this.hashor<V>(value);

    m.delete(v);

    return ImmutableAddress.ofInternal<V>(m);
  }
}
