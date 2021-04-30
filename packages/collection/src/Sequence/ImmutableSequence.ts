import { BinaryFunction, BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection } from '../Interface/Collection';
import { ASequence } from './Abstract/ASequence';

export class ImmutableSequence<V> extends ASequence<V, 'ImmutableSequence'> {
  public readonly noun: 'ImmutableSequence' = 'ImmutableSequence';

  private static readonly EMPTY: ImmutableSequence<unknown> = new ImmutableSequence<unknown>([]);

  public static of<VT>(collection: Collection<number, VT>): ImmutableSequence<VT> {
    return ImmutableSequence.ofInternal<VT>([...collection.values()]);
  }

  public static ofArray<VT>(array: ReadonlyArray<VT>): ImmutableSequence<VT> {
    return ImmutableSequence.ofInternal<VT>([...array]);
  }

  private static ofInternal<VT>(array: Array<VT>): ImmutableSequence<VT> {
    if (array.length === 0) {
      return ImmutableSequence.empty<VT>();
    }

    return new ImmutableSequence<VT>(array);
  }

  public static empty<VT>(): ImmutableSequence<VT> {
    return ImmutableSequence.EMPTY as ImmutableSequence<VT>;
  }

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public set(key: number, value: V): ImmutableSequence<V> {
    try {
      const array: Array<V> = super.setInternal(key, value);

      return ImmutableSequence.ofArray<V>(array);
    }
    catch (err: unknown) {
      if (err instanceof TypeError) {
        return this;
      }

      throw err;
    }
  }

  public remove(key: number): ImmutableSequence<V> {
    try {
      const array: Array<V> = super.removeInternal(key);

      return ImmutableSequence.ofArray<V>(array);
    }
    catch (err: unknown) {
      if (err instanceof TypeError) {
        return this;
      }

      throw err;
    }
  }

  public add(value: V): ImmutableSequence<V> {
    return ImmutableSequence.ofArray<V>([...this.sequence, value]);
  }

  public isEmpty(): boolean {
    return this === ImmutableSequence.empty<V>();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableSequence<W> {
    return ImmutableSequence.ofArray<W>(this.sequence.map<W>(mapper));
  }

  public filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<V> {
    return ImmutableSequence.ofArray<V>(this.sequence.filter(predicate));
  }

  public sort(comparator: BinaryFunction<V, V, number>): ImmutableSequence<V> {
    const arr: Array<V> = this.toArray();

    arr.sort(comparator);

    return ImmutableSequence.ofArray<V>(arr);
  }

  public duplicate(): ImmutableSequence<V> {
    if (this.isEmpty()) {
      return ImmutableSequence.empty<V>();
    }

    return ImmutableSequence.ofArray<V>([...this.sequence]);
  }
}
