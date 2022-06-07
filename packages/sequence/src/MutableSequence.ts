import { BinaryFunction, BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { ASequence } from './ASequence';

export class MutableSequence<in out V> extends ASequence<V> {
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

  public filter(predicate: BinaryPredicate<V, number>): MutableSequence<V> {
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
