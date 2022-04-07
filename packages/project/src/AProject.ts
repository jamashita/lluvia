import { Objet } from '@jamashita/anden-object';
import { Ambiguous, BinaryPredicate, ForEach, isNominative, Kind, Mapping, Nullable } from '@jamashita/anden-type';
import { Quantity } from '@jamashita/lluvia-collection';
import { Project } from './Project';

export abstract class AProject<K, V, T extends AProject<K, V, T>> extends Quantity<K, V> implements Project<K, V> {
  protected readonly project: Map<K | string, [K, V]>;

  protected constructor(project: Map<K | string, [K, V]>) {
    super();
    this.project = project;
  }

  public abstract duplicate(): T;

  public abstract override filter(predicate: BinaryPredicate<V, K>): T;

  public abstract override map<W>(mapping: Mapping<V, W>): Project<K, W>;

  public abstract remove(key: K): T;

  public abstract set(key: K, value: V): T;

  // FIXME O(n)
  public contains(value: V): boolean {
    for (const [, [, v]] of this.project) {
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
    if (!(other instanceof AProject)) {
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
    for (const [, [k, v]] of this.project) {
      if (!predicate(v, k)) {
        return false;
      }
    }

    return true;
  }

  protected filterInternal(predicate: BinaryPredicate<V, K>): Map<K | string, [K, V]> {
    const m: Map<K | string, [K, V]> = new Map();

    this.project.forEach(([k, v]: [K, V]) => {
      if (predicate(v, k)) {
        m.set(Quantity.genKey(k), [k, v]);
      }
    });

    return m;
  }

  public find(predicate: BinaryPredicate<V, K>): Nullable<V> {
    for (const [, [k, v]] of this.project) {
      if (predicate(v, k)) {
        return v;
      }
    }

    return null;
  }

  public forEach(foreach: ForEach<K, V>): void {
    this.project.forEach(([k, v]: [K, V]) => {
      foreach(v, k);
    });
  }

  public get(key: K): Nullable<V> {
    const p: Ambiguous<[K, V]> = this.project.get(Quantity.genKey(key));

    if (Kind.isUndefined(p)) {
      return null;
    }

    return p[1];
  }

  public has(key: K): boolean {
    return this.project.has(Quantity.genKey(key));
  }

  public override isEmpty(): boolean {
    return this.size() === 0;
  }

  public iterator(): IterableIterator<[K, V]> {
    return this.project.values();
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

    this.project.forEach(([k, v]: [K, V]) => {
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
    return this.project.size;
  }

  public some(predicate: BinaryPredicate<V, K>): boolean {
    for (const [, [k, v]] of this.project) {
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


