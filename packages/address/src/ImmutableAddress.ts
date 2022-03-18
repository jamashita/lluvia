import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AAddress } from './AAddress';

export class ImmutableAddress<V> extends AAddress<V, ImmutableAddress<V>> {
  private static readonly EMPTY: ImmutableAddress<unknown> = new ImmutableAddress(new Map());

  public static empty<V>(): ImmutableAddress<V> {
    return ImmutableAddress.EMPTY as ImmutableAddress<V>;
  }

  public static of<V>(collection: Collection<unknown, V>): ImmutableAddress<V> {
    const set: Set<V> = new Set(collection.values());

    return ImmutableAddress.ofSet(set);
  }

  private static ofInternal<V>(address: Map<V | number, V>): ImmutableAddress<V> {
    if (address.size === 0) {
      return ImmutableAddress.empty();
    }

    return new ImmutableAddress(address);
  }

  public static ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V> {
    const m: Map<V | number, V> = new Map();

    set.forEach((v: V) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return ImmutableAddress.ofInternal(m);
  }

  protected constructor(address: Map<V | number, V>) {
    super(address);
  }

  public add(value: V): ImmutableAddress<V> {
    if (this.contains(value)) {
      return this;
    }

    const m: Map<V | number, V> = new Map(this.address);
    const v: V | number = this.hashor(value);

    m.set(v, value);

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

  public map<W>(mapper: Mapper<V, W>): ImmutableAddress<W> {
    return ImmutableAddress.ofInternal(this.mapInternal(mapper));
  }

  public remove(value: V): ImmutableAddress<V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.contains(value)) {
      return this;
    }

    const m: Map<V | number, V> = new Map(this.address);
    const v: V | number = this.hashor(value);

    m.delete(v);

    return ImmutableAddress.ofInternal(m);
  }
}
