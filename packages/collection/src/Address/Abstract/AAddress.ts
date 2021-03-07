import { Objet } from '@jamashita/anden-object';
import { BinaryPredicate, Enumerator, Mapper, Nullable } from '@jamashita/anden-type';
import { Quantity } from '../../Quantity';
import { Address } from '../Interface/Address';

export abstract class AAddress<V, T extends AAddress<V, T>, N extends string = string> extends Quantity<void, V, N> implements Address<V, N> {
  protected readonly address: Map<V | string, V>;

  protected constructor(address: Map<V | string, V>) {
    super();
    this.address = address;
  }

  protected abstract forge(self: Map<V | string, V>): T;

  public abstract add(value: V): Address<V, N>;

  public abstract remove(value: V): Address<V, N>;

  public abstract map<W>(mapper: Mapper<V, W>): Address<W>;

  public abstract duplicate(): Address<V, N>;

  public iterator(): Iterator<[void, V]> {
    const iterator: IterableIterator<V> = this.address.values();
    const iterable: Array<[void, V]> = [];

    let res: IteratorResult<V> = iterator.next();

    while (res.done !== true) {
      iterable.push([undefined, res.value]);

      res = iterator.next();
    }

    return iterable.values();
  }

  public get(): Nullable<V> {
    return null;
  }

  public contains(value: V): boolean {
    const v: V | string = this.hashor<V>(value);

    return this.address.has(v);
  }

  public size(): number {
    return this.address.size;
  }

  public isEmpty(): boolean {
    if (this.size() === 0) {
      return true;
    }

    return false;
  }

  public forEach(iteration: Enumerator<void, V>): void {
    this.address.forEach((v: V) => {
      iteration(v, undefined);
    });
  }

  public find(predicate: BinaryPredicate<V, void>): Nullable<V> {
    for (const [, v] of this.address) {
      if (predicate(v)) {
        return v;
      }
    }

    return null;
  }

  public every(predicate: BinaryPredicate<V, void>): boolean {
    for (const [, v] of this.address) {
      if (!predicate(v)) {
        return false;
      }
    }

    return true;
  }

  public some(predicate: BinaryPredicate<V, void>): boolean {
    for (const [, v] of this.address) {
      if (predicate(v)) {
        return true;
      }
    }

    return false;
  }

  public toSet(): Set<V> {
    return new Set<V>(this.address.values());
  }

  public values(): Iterable<V> {
    const iterator: IterableIterator<V> = this.address.values();
    const iterable: Array<V> = [];

    let res: IteratorResult<V> = iterator.next();

    while (res.done !== true) {
      iterable.push(res.value);

      res = iterator.next();
    }

    return iterable;
  }

  public filter(predicate: BinaryPredicate<V, void>): T {
    const m: Map<V | string, V> = new Map<V | string, V>();

    this.address.forEach((value: V) => {
      if (predicate(value, undefined)) {
        const v: V | string = this.hashor(value);

        m.set(v, value);
      }
    });

    return this.forge(m);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof AAddress)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }

    return this.every((value: V) => {
      return other.contains(value);
    });
  }

  public serialize(): string {
    const properties: Array<string> = [];

    this.forEach((element: V) => {
      properties.push(Objet.identify(element));
    });

    return properties.join(', ');
  }

  protected mapInternal<W>(mapper: Mapper<V, W>): Map<W | string, W> {
    const m: Map<W | string, W> = new Map<W | string, W>();
    let i: number = 0;

    this.address.forEach((value: V) => {
      const w: W = mapper(value, i);
      const v: W | string = this.hashor<W>(w);

      m.set(v, w);
      i++;
    });

    return m;
  }
}
