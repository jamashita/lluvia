import { Objet } from '@jamashita/anden-object';
import {
  Ambiguous,
  BinaryFunction,
  BinaryPredicate,
  Enumerator,
  isEqualable,
  Kind,
  Mapper,
  Nullable
} from '@jamashita/anden-type';
import { Quantity } from '../../Quantity';
import { Sequence } from '../Interface/Sequence';

export abstract class ASequence<V, N extends string = string> extends Quantity<number, V, N> implements Sequence<V, N> {
  protected sequence: Array<V>;

  protected constructor(sequence: Array<V>) {
    super();
    this.sequence = sequence;
  }

  public abstract add(value: V): Sequence<V, N>;

  public abstract set(key: number, value: V): Sequence<V>;

  public abstract remove(key: number): Sequence<V>;

  public abstract map<W>(mapper: Mapper<V, W>): Sequence<W, N>;

  public abstract filter(predicate: BinaryPredicate<V, number>): Sequence<V, N>;

  public abstract sort(comparator: BinaryFunction<V, V, number>): ASequence<V>;

  public abstract duplicate(): Sequence<V, N>;

  public iterator(): IterableIterator<[number, V]> {
    return this.sequence.map<[number, V]>((e: V, i: number) => {
      return [i, e];
    }).values();
  }

  public get(key: number): Nullable<V> {
    const v: Ambiguous<V> = this.sequence[key];

    if (Kind.isUndefined(v)) {
      return null;
    }

    return v;
  }

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

  public size(): number {
    return this.sequence.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public forEach(enumerator: Enumerator<number, V>): void {
    this.sequence.forEach(enumerator);
  }

  public find(predicate: BinaryPredicate<V, number>): Nullable<V> {
    const found: Ambiguous<V> = this.sequence.find(predicate);

    if (Kind.isUndefined(found)) {
      return null;
    }

    return found;
  }

  public every(predicate: BinaryPredicate<V, number>): boolean {
    return this.sequence.every(predicate);
  }

  public some(predicate: BinaryPredicate<V, number>): boolean {
    return this.sequence.some(predicate);
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

  public toArray(): Array<V> {
    return [...this.sequence];
  }

  public serialize(): string {
    return this.sequence.map<string>((v: V) => {
      return Objet.identify(v);
    }).join(', ');
  }

  public values(): Iterable<V> {
    return this.toArray();
  }

  protected setInternal(key: number, value: V): Array<V> {
    if (!Kind.isInteger(key)) {
      throw new TypeError('KEY IS NOT INTEGER');
    }
    if (key < 0 || this.sequence.length <= key) {
      throw new TypeError('KEY IS OUT OF RANGE');
    }

    return [...this.sequence.slice(0, key), value, ...this.sequence.slice(key + 1)];
  }

  protected removeInternal(key: number): Array<V> {
    if (!Kind.isInteger(key)) {
      throw new TypeError('KEY IS NOT INTEGER');
    }
    if (key < 0 || this.sequence.length <= key) {
      throw new TypeError('KEY IS OUT OF RANGE');
    }

    return [...this.sequence.slice(0, key), ...this.sequence.slice(key + 1)];
  }
}
