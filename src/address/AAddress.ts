import { Objet } from '@jamashita/anden/object';
import type { BinaryPredicate, ForEach, Mapping, Nullable } from '@jamashita/anden/type';
import { type NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import type { Address } from './Address.js';

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

  public override equals(other: unknown): boolean {
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

    for (const [, v] of this.address) {
      if (predicate(v, undefined)) {
        m.set(Quantity.genKey(v), v);
      }
    }

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
    for (const [, v] of this.address) {
      foreach(v);
    }
  }

  public get(): null {
    return null;
  }

  public has(value: V): boolean {
    return this.address.has(Quantity.genKey(value));
  }

  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  public iterator(): IterableIterator<[void, V]> {
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
    const iterable: Array<[void, V]> = [];

    for (const [, v] of this.address) {
      iterable.push([undefined, v]);
    }

    return iterable.values();
  }

  protected mapInternal<W>(mapping: Mapping<V, W>): Map<W | string, W> {
    const m: Map<W | string, W> = new Map();
    let i = 0;

    for (const [, v] of this.address) {
      const w: W = mapping(v, i);

      m.set(Quantity.genKey(w), w);
      i++;
    }

    return m;
  }

  public serialize(): string {
    const props: Array<string> = [];

    for (const [, v] of this.address) {
      props.push(Objet.identify(v));
    }

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
