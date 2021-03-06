import { BinaryFunction, BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { ASequence } from './ASequence.js';

export class MutableSequence<V> extends ASequence<V, MutableSequence<V>, 'MutableSequence'> {
  public readonly noun: 'MutableSequence' = 'MutableSequence';

  public static empty<VT>(): MutableSequence<VT> {
    return MutableSequence.ofArray<VT>([]);
  }

  public static of<VT>(collection: Collection<number, VT>): MutableSequence<VT> {
    return MutableSequence.ofInternal<VT>([...collection.values()]);
  }

  public static ofArray<VT>(array: ReadonlyArray<VT>): MutableSequence<VT> {
    return MutableSequence.ofInternal<VT>([...array]);
  }

  private static ofInternal<VT>(array: Array<VT>): MutableSequence<VT> {
    return new MutableSequence<VT>(array);
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
