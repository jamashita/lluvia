import { Objet } from '@jamashita/anden/object';
import { BinaryPredicate, ForEach, Mapping, Nullable } from '@jamashita/anden/type';
import { NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import { Address } from './Address.js';

export abstract class AAddress<out V> extends Quantity<void, V> implements Address<V> {
  protected readonly address: Map<V | string, V>;

  protected constructor(address: Map<V | string, V>) {
    super();
    this.address = address;
  }

  public abstract add(value: V): AAddress<V>;

  public abstract duplicate(): AAddress<V>;

  public abstract override filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): AAddress<W>;
  public abstract override filter(predicate: BinaryPredicate<V, void>): AAddress<V>;

  public abstract override map<W>(mapping: Mapping<V, W>): AAddress<W>;

  public abstract remove(value: V): AAddress<V>;

  public contains(value: V): boolean {
    return this.address.has(Quantity.genKey(value));
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

  public every(predicate: BinaryPredicate<V, void>): boolean {
    for (const [, v] of this.address) {
      if (!predicate(v)) {
        return false;
      }
    }

    return true;
  }

  protected filterInternal<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, void>): Map<W | string, W> {
    const m: Map<W | string, W> = new Map();

    this.address.forEach((value: V) => {
      if (predicate(value, undefined)) {
        m.set(Quantity.genKey(value), value);
      }
    });

    return m;
  }

  public find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): Nullable<W>;
  public find(predicate: BinaryPredicate<V, void>): Nullable<V>;
  public find<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, void>): Nullable<W> {
    for (const [, v] of this.address) {
      if (predicate(v)) {
        return v;
      }
    }

    return null;
  }

  public forEach(foreach: ForEach<void, V>): void {
    this.address.forEach((v: V) => {
      foreach(v);
    });
  }

  public get(): Nullable<V> {
    return null;
  }

  public override hashCode(): string {
    const set: Set<V> = new Set<V>([...this.address.values()]);

    return Objet.genHashCode(set);
  }

  public iterator(): IterableIterator<[void, V]> {
    const iterable: Array<[void, V]> = [];

    for (const [, v] of this.address) {
      iterable.push([undefined, v]);
    }

    return iterable.values();
  }

  protected mapInternal<W>(mapping: Mapping<V, W>): Map<W | string, W> {
    const m: Map<W | string, W> = new Map();
    let i: number = 0;

    this.address.forEach((value: V) => {
      const w: W = mapping(value, i);

      m.set(Quantity.genKey(w), w);
      i++;
    });

    return m;
  }

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

  public values(): IterableIterator<V> {
    return this.address.values();
  }
}
