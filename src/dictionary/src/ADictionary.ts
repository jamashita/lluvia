import { Objet } from '@jamashita/anden-object';
import { Ambiguous, BinaryPredicate, ForEach, isNominative, Kind, Mapping, Nullable } from '@jamashita/anden-type';
import { NarrowingBinaryPredicate, Quantity } from '@jamashita/lluvia-collection';
import { Dictionary } from './Dictionary';

export abstract class ADictionary<out K, out V> extends Quantity<K, V> implements Dictionary<K, V> {
  protected readonly dictionary: Map<K | string, [K, V]>;

  protected constructor(dictionary: Map<K | string, [K, V]>) {
    super();
    this.dictionary = dictionary;
  }

  public abstract duplicate(): ADictionary<K, V>;

  public abstract override filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ADictionary<K, W>;
  public abstract override filter(predicate: BinaryPredicate<V, K>): ADictionary<K, V>;

  public abstract override map<W>(mapping: Mapping<V, W>): ADictionary<K, W>;

  public abstract remove(key: K): ADictionary<K, V>;

  public abstract set(key: K, value: V): ADictionary<K, V>;

  // FIXME O(n)
  public contains(value: V): boolean {
    for (const [, [, v]] of this.dictionary) {
      if (value === v) {
        return true;
      }
      if (isNominative(value)) {
        if (value.equals(v)) {
          return true;
        }
      }
    }

    return false;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ADictionary)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }

    return this.every((v: V, k: K) => {
      const value: Nullable<unknown> = other.get(k);

      if (v === value) {
        return true;
      }
      if (isNominative(v)) {
        if (v.equals(value)) {
          return true;
        }
      }

      return false;
    });
  }

  public every(predicate: BinaryPredicate<V, K>): boolean {
    for (const [, [k, v]] of this.dictionary) {
      if (!predicate(v, k)) {
        return false;
      }
    }

    return true;
  }

  protected filterInternal<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, K>): Map<K | string, [K, W]> {
    const m: Map<K | string, [K, W]> = new Map();

    this.dictionary.forEach(([k, v]: [K, V]) => {
      if (predicate(v, k)) {
        m.set(Quantity.genKey(k), [k, v]);
      }
    });

    return m;
  }

  public find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nullable<W>;
  public find(predicate: BinaryPredicate<V, K>): Nullable<V>;
  public find<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nullable<W> {
    for (const [, [k, v]] of this.dictionary) {
      if (predicate(v, k)) {
        return v;
      }
    }

    return null;
  }

  public forEach(foreach: ForEach<K, V>): void {
    this.dictionary.forEach(([k, v]: [K, V]) => {
      foreach(v, k);
    });
  }

  public get(key: K): Nullable<V> {
    const p: Ambiguous<[K, V]> = this.dictionary.get(Quantity.genKey(key));

    if (Kind.isUndefined(p)) {
      return null;
    }

    return p[1];
  }

  public has(key: K): boolean {
    return this.dictionary.has(Quantity.genKey(key));
  }

  public override isEmpty(): boolean {
    return this.size() === 0;
  }

  public iterator(): IterableIterator<[K, V]> {
    return this.dictionary.values();
  }

  public keys(): Iterable<K> {
    const iterable: Array<K> = [];

    this.forEach((_: V, k: K) => {
      iterable.push(k);
    });

    return iterable;
  }

  protected mapInternal<W>(mapping: Mapping<V, W>): Map<K | string, [K, W]> {
    const m: Map<K | string, [K, W]> = new Map();
    let i: number = 0;

    this.dictionary.forEach(([k, v]: [K, V]) => {
      m.set(Quantity.genKey(k), [k, mapping(v, i)]);
      i++;
    });

    return m;
  }

  public serialize(): string {
    const props: Array<string> = [];

    this.forEach((v: V, k: K) => {
      props.push(`{${Objet.identify(k)}: ${Objet.identify(v)}}`);
    });

    return props.join(', ');
  }

  public size(): number {
    return this.dictionary.size;
  }

  public some(predicate: BinaryPredicate<V, K>): boolean {
    for (const [, [k, v]] of this.dictionary) {
      if (predicate(v, k)) {
        return true;
      }
    }

    return false;
  }

  public toMap(): Map<K, V> {
    const map: Map<K, V> = new Map();

    this.forEach((v: V, k: K) => {
      map.set(k, v);
    });

    return map;
  }

  public values(): Iterable<V> {
    const iterable: Array<V> = [];

    this.forEach((v: V) => {
      iterable.push(v);
    });

    return iterable;
  }
}


