import { Objet } from '@jamashita/anden-object';
import { BinaryPredicate, Catalogue, Mapper, Nullable } from '@jamashita/anden-type';
import { Quantity } from '@jamashita/lluvia-collection';
import { Address } from './Address.js';

export abstract class AAddress<V, T extends AAddress<V, T>, N extends string = string> extends Quantity<void, V, N> implements Address<V, N> {
  protected readonly address: Map<V | string, V>;

  protected constructor(address: Map<V | string, V>) {
    super();
    this.address = address;
  }

  public abstract add(value: V): T;

  public contains(value: V): boolean {
    return this.address.has(this.hashor<V>(value));
  }

  public abstract duplicate(): T;

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

  public every(predicate: BinaryPredicate<V, void>): boolean {
    for (const [, v] of this.address) {
      if (!predicate(v)) {
        return false;
      }
    }

    return true;
  }

  public abstract override filter(predicate: BinaryPredicate<V, void>): T;

  public find(predicate: BinaryPredicate<V, void>): Nullable<V> {
    for (const [, v] of this.address) {
      if (predicate(v)) {
        return v;
      }
    }

    return null;
  }

  public forEach(catalogue: Catalogue<void, V>): void {
    this.address.forEach((v: V) => {
      catalogue(v);
    });
  }

  public get(): Nullable<V> {
    return null;
  }

  public iterator(): IterableIterator<[void, V]> {
    const iterator: IterableIterator<V> = this.address.values();
    const iterable: Array<[void, V]> = [];

    let res: IteratorResult<V> = iterator.next();

    while (res.done !== true) {
      iterable.push([undefined, res.value]);

      res = iterator.next();
    }

    return iterable.values();
  }

  public abstract override map<W>(mapper: Mapper<V, W>): Address<W>;

  public abstract remove(value: V): T;

  public serialize(): string {
    const props: Array<string> = [];

    this.forEach((element: V) => {
      props.push(Objet.identify(element));
    });

    return props.join(', ');
  }

  public size(): number {
    return this.address.size;
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

  protected filterInternal(predicate: BinaryPredicate<V, void>): Map<V | string, V> {
    const m: Map<V | string, V> = new Map<V | string, V>();

    this.address.forEach((value: V) => {
      if (predicate(value, undefined)) {
        const v: V | string = this.hashor(value);

        m.set(v, value);
      }
    });

    return m;
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
