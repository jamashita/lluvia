import { BinaryFunction, BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { ASequence } from './ASequence';

export class MutableSequence<V> extends ASequence<V, MutableSequence<V>> {
  public static empty<V>(): MutableSequence<V> {
    return MutableSequence.ofArray<V>([]);
  }

  public static of<V>(collection: Collection<number, V>): MutableSequence<V> {
    return MutableSequence.ofInternal<V>([...collection.values()]);
  }

  public static ofArray<V>(array: ReadonlyArray<V>): MutableSequence<V> {
    return MutableSequence.ofInternal<V>([...array]);
  }

  private static ofInternal<V>(array: Array<V>): MutableSequence<V> {
    return new MutableSequence<V>(array);
  }

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public add(value: V): MutableSequence<V> {
    this.sequence.push(value);

    return this;
  }

  public duplicate(): MutableSequence<V> {
    return MutableSequence.ofArray<V>([...this.sequence]);
  }

  public filter(predicate: BinaryPredicate<V, number>): MutableSequence<V> {
    return MutableSequence.ofArray<V>(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableSequence<W> {
    return MutableSequence.ofArray<W>(this.sequence.map<W>(mapper));
  }

  public remove(key: number): MutableSequence<V> {
    this.sequence = this.removeInternal(key);

    return this;
  }

  public set(key: number, value: V): MutableSequence<V> {
    this.sequence = this.setInternal(key, value);

    return this;
  }

  public sort(comparator: BinaryFunction<V, V, number>): MutableSequence<V> {
    const arr: Array<V> = [...this.sequence];

    arr.sort(comparator);

    return MutableSequence.ofArray<V>(arr);
  }
}
