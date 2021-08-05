import { Objet } from '@jamashita/anden-object';
import {
  Ambiguous,
  BinaryFunction,
  BinaryPredicate,
  Catalogue,
  isEqualable,
  Kind,
  Mapper,
  Nullable
} from '@jamashita/anden-type';
import { Quantity } from '@jamashita/lluvia-collection';
import { Sequence } from './Sequence.js';

export abstract class ASequence<V, T extends ASequence<V, T>, N extends string = string> extends Quantity<number, V, N> implements Sequence<V, N> {
  protected sequence: Array<V>;

  protected constructor(sequence: Array<V>) {
    super();
    this.sequence = sequence;
  }

  public abstract add(value: V): Sequence<V, N>;

  public abstract set(key: number, value: V): T;

  public abstract remove(key: number): T;

  public abstract duplicate(): T;

  public abstract override map<W>(mapper: Mapper<V, W>): Sequence<W>;

  public abstract override filter(predicate: BinaryPredicate<V, number>): T;

  public abstract sort(comparator: BinaryFunction<V, V, number>): T;

  public contains(value: V): boolean {
    const found: Ambiguous<V> = this.sequence.find((v: V) => {
      if (v === value) {
        return true;
      }
      if (isEqualable(v)) {
        return v.equals(value);
      }

      return false;
    });

    return !Kind.isUndefined(found);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ASequence)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }

    const ti: Iterator<V> = this.values()[Symbol.iterator]();
    const oi: Iterator<unknown> = other.values()[Symbol.iterator]();
    let tr: IteratorResult<V> = ti.next();
    let or: IteratorResult<unknown> = oi.next();

    while (tr.done !== true && or.done !== true) {
      if (isEqualable(tr.value) && isEqualable(or.value)) {
        if (!tr.value.equals(or.value)) {
          return false;
        }
      }
 else if (tr.value !== or.value) {
        return false;
      }

      tr = ti.next();
      or = oi.next();

      if (tr.done === true && or.done === true) {
        return true;
      }
    }

    return false;
  }

  public every(predicate: BinaryPredicate<V, number>): boolean {
    const found: Ambiguous<V> = this.sequence.find((v: V, i: number) => {
      return !predicate(v, i);
    });

    return Kind.isUndefined(found);
  }

  public find(predicate: BinaryPredicate<V, number>): Nullable<V> {
    const found: Ambiguous<V> = this.sequence.find(predicate);

    if (Kind.isUndefined(found)) {
      return null;
    }

    return found;
  }

  public forEach(catalogue: Catalogue<number, V>): void {
    this.sequence.forEach((v: V, i: number) => {
      catalogue(v, i);
    });
  }

  public get(key: number): Nullable<V> {
    const v: Ambiguous<V> = this.sequence[key];

    if (Kind.isUndefined(v)) {
      return null;
    }

    return v;
  }

  public iterator(): IterableIterator<[number, V]> {
    return this.sequence.map<[number, V]>((e: V, i: number) => {
      return [i, e];
    }).values();
  }

  public serialize(): string {
    return this.sequence.map<string>((v: V) => {
      return Objet.identify(v);
    }).join(', ');
  }

  public size(): number {
    return this.sequence.length;
  }

  public some(predicate: BinaryPredicate<V, number>): boolean {
    const found: Ambiguous<V> = this.sequence.find(predicate);

    return !Kind.isUndefined(found);
  }

  public toArray(): Array<V> {
    return [...this.sequence];
  }

  public values(): Iterable<V> {
    return this.toArray();
  }

  protected filterInternal(predicate: BinaryPredicate<V, number>): Array<V> {
    const arr: Array<V> = [];

    this.sequence.forEach((v: V, i: number) => {
      if (predicate(v, i)) {
        arr.push(v);
      }
    });

    return arr;
  }

  protected removeInternal(key: number): Array<V> {
    if (!Kind.isInteger(key)) {
      return this.sequence;
    }
    if (key < 0 || this.sequence.length <= key) {
      return this.sequence;
    }

    return [...this.sequence.slice(0, key), ...this.sequence.slice(key + 1)];
  }

  protected setInternal(key: number, value: V): Array<V> {
    if (!Kind.isInteger(key)) {
      return this.sequence;
    }
    if (key < 0 || this.sequence.length <= key) {
      return this.sequence;
    }

    return [...this.sequence.slice(0, key), value, ...this.sequence.slice(key + 1)];
  }
}
