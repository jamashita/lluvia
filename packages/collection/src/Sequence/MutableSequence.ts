import { BinaryFunction, BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection } from '../Interface/Collection';
import { ASequence } from './Abstract/ASequence';

export class MutableSequence<V> extends ASequence<V, 'MutableSequence'> {
  public readonly noun: 'MutableSequence' = 'MutableSequence';

  public static of<VT>(collection: Collection<number, VT>): MutableSequence<VT> {
    return MutableSequence.ofInternal<VT>([...collection.values()]);
  }

  public static ofArray<VT>(array: ReadonlyArray<VT>): MutableSequence<VT> {
    return MutableSequence.ofInternal<VT>([...array]);
  }

  private static ofInternal<VT>(array: Array<VT>): MutableSequence<VT> {
    return new MutableSequence<VT>(array);
  }

  public static empty<VT>(): MutableSequence<VT> {
    return MutableSequence.ofArray<VT>([]);
  }

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public set(key: number, value: V): MutableSequence<V> {
    try {
      this.sequence = this.setInternal(key, value);

      return this;
    }
    catch (err: unknown) {
      if (err instanceof TypeError) {
        return this;
      }

      throw err;
    }
  }

  public remove(key: number): MutableSequence<V> {
    try {
      this.sequence = this.removeInternal(key);

      return this;
    }
    catch (err: unknown) {
      if (err instanceof TypeError) {
        return this;
      }

      throw err;
    }
  }

  public add(value: V): MutableSequence<V> {
    this.sequence.push(value);

    return this;
  }

  public map<W>(mapper: Mapper<V, W>): MutableSequence<W> {
    return MutableSequence.ofArray<W>(this.sequence.map<W>(mapper));
  }

  public filter(predicate: BinaryPredicate<V, number>): MutableSequence<V> {
    return MutableSequence.ofArray<V>(this.sequence.filter(predicate));
  }

  public sort(comparator: BinaryFunction<V, V, number>): MutableSequence<V> {
    const arr: Array<V> = [...this.sequence];

    arr.sort(comparator);

    return MutableSequence.ofArray<V>(arr);
  }

  public duplicate(): MutableSequence<V> {
    return MutableSequence.ofArray<V>([...this.sequence]);
  }
}
