import { BinaryFunction, BinaryPredicate, Mapping } from '@jamashita/anden/type';
import { Collection, NarrowingBinaryPredicate } from '../collection/index.js';
import { ASequence } from './ASequence.js';
import { ReadonlySequence } from './ReadonlySequence.js';
import { SequenceUtil } from './SequenceUtil.js';

export class MutableSequence<out V> extends ASequence<V> {
  public static await<V>(sequence: ReadonlySequence<PromiseLike<V>>): Promise<MutableSequence<V>> {
    return SequenceUtil.await(sequence, (values: Array<V>) => {
      return MutableSequence.ofArray(values);
    });
  }

  public static empty<V>(): MutableSequence<V> {
    return MutableSequence.ofArray([] as Array<V>);
  }

  public static of<V>(collection: Collection<number, V>): MutableSequence<V> {
    return MutableSequence.ofInternal([...collection.values()]);
  }

  public static ofArray<V>(array: ReadonlyArray<V>): MutableSequence<V> {
    return MutableSequence.ofInternal([...array]);
  }

  private static ofInternal<V>(array: Array<V>): MutableSequence<V> {
    return new MutableSequence(array);
  }

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public add(value: V): this {
    this.sequence.push(value);

    return this;
  }

  public duplicate(): MutableSequence<V> {
    return MutableSequence.ofArray([...this.sequence]);
  }

  public filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): MutableSequence<W>;
  public filter(predicate: BinaryPredicate<V, number>): MutableSequence<V>;
  public filter<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, number>): MutableSequence<W> {
    return MutableSequence.ofArray(this.filterInternal(predicate));
  }

  public map<W>(mapping: Mapping<V, W>): MutableSequence<W> {
    return MutableSequence.ofArray(this.sequence.map(mapping));
  }

  public remove(key: number): this {
    this.sequence = this.removeInternal(key);

    return this;
  }

  public set(key: number, value: V): this {
    this.sequence = this.setInternal(key, value);

    return this;
  }

  public sort(comparator: BinaryFunction<V, V, number>): MutableSequence<V> {
    const arr: Array<V> = [...this.sequence];

    arr.sort(comparator);

    return MutableSequence.ofArray(arr);
  }
}
