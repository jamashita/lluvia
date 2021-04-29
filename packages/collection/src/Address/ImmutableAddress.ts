import { isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '../Interface/Collection';
import { AAddress } from './Abstract/AAddress';

export class ImmutableAddress<V> extends AAddress<V, ImmutableAddress<V>, 'ImmutableAddress'> {
  public readonly noun: 'ImmutableAddress' = 'ImmutableAddress';

  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map<unknown, unknown>());

  public static of<VT>(collection: Collection<unknown, VT>): ImmutableAddress<VT> {
    const set: Set<VT> = new Set<VT>(collection.values());

    return ImmutableAddress.ofSet<VT>(set);
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

  private static ofInternal<VT>(address: Map<VT | string, VT>): ImmutableAddress<VT> {
    if (address.size === 0) {
      return ImmutableAddress.empty<VT>();
    }

    return new ImmutableAddress<VT>(address);
  }

  public static empty<VT>(): ImmutableAddress<VT> {
    return ImmutableAddress.EMPTY as ImmutableAddress<VT>;
  }

  protected constructor(address: Map<V | string, V>) {
    super(address);
  }

  protected forge(self: Map<V | string, V>): ImmutableAddress<V> {
    if (self.size === 0) {
      return ImmutableAddress.empty<V>();
    }

    return ImmutableAddress.ofInternal<V>(self);
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

  public isEmpty(): boolean {
    if (this === ImmutableAddress.empty<V>()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableAddress<W> {
    const m: Map<W | string, W> = this.mapInternal<W>(mapper);

    return ImmutableAddress.ofInternal<W>(m);
  }

  public duplicate(): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return ImmutableAddress.empty<V>();
    }

    const m: Map<V | string, V> = new Map<V | string, V>(this.address);

    return ImmutableAddress.ofInternal<V>(m);
  }
}
