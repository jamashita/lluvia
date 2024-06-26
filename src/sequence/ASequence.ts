import { Objet } from '@jamashita/anden/object';
import {
  type BinaryFunction,
  type BinaryPredicate,
  type ForEach,
  isEquatable,
  Kind,
  type Mapping,
  type Nullable,
  type Undefinable
} from '@jamashita/anden/type';
import { Random } from '@jamashita/steckdose/random';
import { type NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import type { Sequence } from './Sequence.js';
import { SequenceError } from './SequenceError.js';

export abstract class ASequence<out V> extends Quantity<number, V> implements Sequence<V> {
  protected sequence: Array<V>;

  protected constructor(sequence: Array<V>) {
    super();
    this.sequence = sequence;
  }

  public abstract add(value: V): ASequence<V>;

  public abstract chunk(size: number): ASequence<ASequence<V>>;

  public abstract duplicate(): ASequence<V>;

  public abstract override filter(predicate: BinaryPredicate<V, number>): ASequence<V>;

  public abstract override filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ASequence<W>;

  public abstract override map<W>(mapping: Mapping<V, W>): ASequence<W>;

  public abstract remove(key: number): ASequence<V>;

  public abstract set(key: number, value: V): ASequence<V>;

  public abstract shuffle(): ASequence<V>;

  public abstract sort(comparator: BinaryFunction<V, V, number>): ASequence<V>;

  protected chunkInternal(size: number): Array<Array<V>> {
    if (size <= 0) {
      throw new SequenceError(`CHUNK SIZE MUST BE GREATER THAN 0. GIVEN: ${size}`);
    }
    if (!Kind.isInteger(size)) {
      throw new SequenceError(`CHUNK SIZE MUST BE INTEGER. GIVEN: ${size}`);
    }

    const arr: Array<Array<V>> = [];
    let chunk: Array<V> = [];

    this.sequence.forEach((v: V, i: number) => {
      if (i % size === 0 && i !== 0) {
        arr.push(chunk);
        chunk = [];
      }

      chunk.push(v);
    });

    arr.push(chunk);

    return arr;
  }

  public contains(value: V): boolean {
    const found: Undefinable<V> = this.sequence.find((v: V) => {
      if (v === value) {
        return true;
      }
      if (isEquatable(v)) {
        return v.equals(value);
      }

      return false;
    });

    return !Kind.isUndefined(found);
  }

  public override equals(other: unknown): boolean {
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
      if (isEquatable(v)) {
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
    const found: Undefinable<W> = this.sequence.find(predicate);

    if (Kind.isUndefined(found)) {
      return null;
    }

    return found;
  }

  public forEach(foreach: ForEach<number, V>): void {
    this.sequence.forEach(foreach);
  }

  public get(key: number): Nullable<V> {
    const v: Undefinable<V> = this.sequence[key];

    if (Kind.isUndefined(v)) {
      return null;
    }

    return v;
  }

  public iterator(): IterableIterator<[number, V]> {
    return this.sequence
      .map((e: V, i: number): [number, V] => {
        return [i, e];
      })
      .values();
  }

  public reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V {
    if (Kind.isUndefined(initialValue)) {
      return this.sequence.reduce(reducer);
    }

    return this.sequence.reduce(reducer, initialValue);
  }

  protected removeInternal(key: number): Array<V> {
    if (!Kind.isInteger(key)) {
      throw new SequenceError(`REMOVE KEY MUST BE INTEGER. GIVEN: ${key}`);
    }
    if (key < 0 || this.sequence.length <= key) {
      throw new SequenceError(`REMOVE KEY IS OUT OF BOUND. GIVEN: ${key}`);
    }

    return [...this.sequence.slice(0, key), ...this.sequence.slice(key + 1)];
  }

  public serialize(): string {
    return this.sequence
      .map((v: V) => {
        return Objet.identify(v);
      })
      .join(', ');
  }

  protected setInternal(key: number, value: V): Array<V> {
    if (!Kind.isInteger(key)) {
      throw new SequenceError(`SET KEY MUST BE INTEGER. GIVEN: ${key}`);
    }
    if (key < 0 || this.sequence.length <= key) {
      throw new SequenceError(`SET KEY IS OUT OF BOUND. GIVEN: ${key}`);
    }

    return [...this.sequence.slice(0, key), value, ...this.sequence.slice(key + 1)];
  }

  protected shuffleInternal(): Array<V> {
    const arr: Array<V> = [...this.sequence];

    for (let i: number = arr.length - 1; i >= 0; i--) {
      const j: number = Random.integer(0, i);
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }

    return arr;
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

  public values(): IterableIterator<V> {
    return this.sequence.values();
  }
}
