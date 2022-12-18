import { Objet } from '@jamashita/anden/object';
import {
  Ambiguous,
  BinaryFunction,
  BinaryPredicate,
  ForEach,
  isEqualable,
  Kind,
  Mapping,
  Nullable
} from '@jamashita/anden/type';
import { NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import { Sequence } from './Sequence.js';

export abstract class ASequence<out V> extends Quantity<number, V> implements Sequence<V> {
  protected sequence: Array<V>;

  protected constructor(sequence: Array<V>) {
    super();
    this.sequence = sequence;
  }

  public abstract add(value: V): ASequence<V>;

  public abstract duplicate(): ASequence<V>;

  public abstract override filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ASequence<W>;
  public abstract override filter(predicate: BinaryPredicate<V, number>): ASequence<V>;

  public abstract override map<W>(mapping: Mapping<V, W>): ASequence<W>;

  public abstract remove(key: number): ASequence<V>;

  public abstract set(key: number, value: V): ASequence<V>;

  public abstract sort(comparator: BinaryFunction<V, V, number>): ASequence<V>;

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

    return this.sequence.every((v: V, i: number) => {
      if (v === other.sequence[i]) {
        return true;
      }
      if (isEqualable(v)) {
        return v.equals(other.sequence[i]);
      }

      return false;
    });
  }

  public every(predicate: BinaryPredicate<V, number>): boolean {
    return this.sequence.every(predicate);
  }

  protected filterInternal<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, number>): Array<W> {
    const arr: Array<W> = [];

    this.sequence.forEach((v: V, i: number) => {
      if (predicate(v, i)) {
        arr.push(v);
      }
    });

    return arr;
  }

  public find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): Nullable<W>;
  public find(predicate: BinaryPredicate<V, number>): Nullable<V>;
  public find<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, number>): Nullable<W> {
    const found: Ambiguous<W> = this.sequence.find(predicate);

    if (Kind.isUndefined(found)) {
      return null;
    }

    return found;
  }

  public forEach(foreach: ForEach<number, V>): void {
    this.sequence.forEach(foreach);
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

  public reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V {
    if (Kind.isUndefined(initialValue)) {
      return this.sequence.reduce(reducer);
    }

    return this.sequence.reduce(reducer, initialValue);
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

  public serialize(): string {
    return this.sequence.map<string>((v: V) => {
      return Objet.identify(v);
    }).join(', ');
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

  public size(): number {
    return this.sequence.length;
  }

  public some(predicate: BinaryPredicate<V, number>): boolean {
    return this.sequence.some(predicate);
  }

  public toArray(): Array<V> {
    return [...this.sequence];
  }

  public values(): Iterable<V> {
    return this.toArray();
  }
}
