import { BinaryPredicate, isNominative, Mapper, Whatever } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress.js';

export class ImmutableAddress<V> extends AAddress<V, ImmutableAddress<V>, 'ImmutableAddress'> {
  public readonly noun: 'ImmutableAddress' = 'ImmutableAddress';

  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map<unknown, unknown>());

  public static empty<VT>(): ImmutableAddress<VT> {
    return ImmutableAddress.EMPTY as ImmutableAddress<VT>;
  }

  public static of<VT>(collection: Collection<Whatever, VT>): ImmutableAddress<VT> {
    const set: Set<VT> = new Set<VT>(collection.values());

    return ImmutableAddress.ofSet<VT>(set);
  }

  private static ofInternal<VT>(address: Map<VT | string, VT>): ImmutableAddress<VT> {
    if (address.size === 0) {
      return ImmutableAddress.empty<VT>();
    }

    return new ImmutableAddress<VT>(address);
  }

  public static ofSet<VT>(set: ReadonlySet<VT>): ImmutableAddress<VT> {
    const m: Map<VT | string, VT> = new Map<VT | string, VT>();

    set.forEach((v: VT) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return ImmutableAddress.ofInternal<VT>(m);
  }

  protected constructor(address: Map<V | string, V>) {
    super(address);
  }

  public add(value: V): ImmutableAddress<V> {
    if (this.contains(value)) {
      return this;
    }

    const m: Map<V | string, V> = new Map<V | string, V>(this.address);
    const v: V | string = this.hashor<V>(value);

    m.set(v, value);

    return ImmutableAddress.ofInternal<V>(m);
  }

  public duplicate(): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return ImmutableAddress.empty<V>();
    }

    return ImmutableAddress.ofInternal<V>(new Map<V | string, V>(this.address));
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

    const m: Map<V | string, V> = new Map<V | string, V>(this.address);
    const v: V | string = this.hashor<V>(value);

    m.delete(v);

    return ImmutableAddress.ofInternal<V>(m);
  }
}
