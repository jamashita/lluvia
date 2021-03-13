import { Objet } from '@jamashita/anden-object';
import { Ambiguous, BinaryPredicate, Enumerator, isNominative, Kind, Mapper, Nullable } from '@jamashita/anden-type';
import { Quantity } from '../../Quantity';
import { Project } from '../Interface/Project';

export abstract class AProject<K, V, T extends AProject<K, V, T>, N extends string = string> extends Quantity<K, V, N> implements Project<K, V, N> {
  protected readonly project: Map<K | string, [K, V]>;

  protected constructor(project: Map<K | string, [K, V]>) {
    super();
    this.project = project;
  }

  protected abstract forge(self: Map<K | string, [K, V]>): T;

  public abstract set(key: K, value: V): Project<K, V, N>;

  public abstract remove(key: K): Project<K, V, N>;

  public abstract map<W>(mapper: Mapper<V, W>): Project<K, W>;

  public filter(predicate: BinaryPredicate<V, K>): T {
    const m: Map<K | string, [K, V]> = new Map<K | string, [K, V]>();

    this.project.forEach(([k, v]: [K, V]) => {
      if (predicate(v, k)) {
        const key: K | string = this.hashor<K>(k);

        m.set(key, [k, v]);
      }
    });

    return this.forge(m);
  }

  public abstract duplicate(): Project<K, V, N>;

  public iterator(): IterableIterator<[K, V]> {
    return this.project.values();
  }

  public get(key: K): Nullable<V> {
    const k: K | string = this.hashor<K>(key);
    const p: Ambiguous<[K, V]> = this.project.get(k);

    if (Kind.isUndefined(p)) {
      return null;
    }

    return p[1];
  }

  public has(key: K): boolean {
    const k: K | string = this.hashor<K>(key);

    return this.project.has(k);
  }

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

  public size(): number {
    return this.project.size;
  }

  public isEmpty(): boolean {
    if (this.size() === 0) {
      return true;
    }

    return false;
  }

  public forEach(iteration: Enumerator<K, V>): void {
    this.project.forEach(([k, v]: [K, V]) => {
      iteration(v, k);
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

  public some(predicate: BinaryPredicate<V, K>): boolean {
    for (const [, [k, v]] of this.project) {
      if (predicate(v, k)) {
        return true;
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

  public toMap(): Map<K, V> {
    const map: Map<K, V> = new Map<K, V>();

    this.forEach((v: V, k: K) => {
      map.set(k, v);
    });

    return map;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    this.forEach((v: V, k: K) => {
      properties.push(`{${Objet.identify(k)}: ${Objet.identify(v)}}`);
    });

    return properties.join(', ');
  }

  public keys(): Iterable<K> {
    const iterable: Array<K> = [];

    this.forEach((_: V, k: K) => {
      iterable.push(k);
    });

    return iterable;
  }

  public values(): Iterable<V> {
    const iterable: Array<V> = [];

    this.forEach((v: V) => {
      iterable.push(v);
    });

    return iterable;
  }

  public find(predicate: BinaryPredicate<V, K>): Nullable<V> {
    for (const [, [k, v]] of this.project) {
      if (predicate(v, k)) {
        return v;
      }
    }

    return null;
  }

  protected mapInternal<W>(mapper: Mapper<V, W>): Map<K | string, [K, W]> {
    const m: Map<K | string, [K, W]> = new Map<K | string, [K, W]>();
    let i: number = 0;

    this.project.forEach(([k, v]: [K, V]) => {
      const key: K | string = this.hashor<K>(k);

      m.set(key, [k, mapper(v, i)]);
      i++;
    });

    return m;
  }
}


