import { BinaryFunction, BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection } from '../Interface/Collection';
import { ASequence } from './Abstract/ASequence';

export class ImmutableSequence<V> extends ASequence<V, ImmutableSequence<V>, 'ImmutableSequence'> {
  public readonly noun: 'ImmutableSequence' = 'ImmutableSequence';

  private static readonly EMPTY: ImmutableSequence<unknown> = new ImmutableSequence<unknown>([]);

  public static empty<VT>(): ImmutableSequence<VT> {
    return ImmutableSequence.EMPTY as ImmutableSequence<VT>;
  }

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

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public add(value: V): ImmutableSequence<V> {
    return ImmutableSequence.ofArray<V>([...this.sequence, value]);
  }

  public duplicate(): ImmutableSequence<V> {
    if (this.isEmpty()) {
      return ImmutableSequence.empty<V>();
    }

    return ImmutableSequence.ofArray<V>([...this.sequence]);
  }

  public filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<V> {
    return ImmutableSequence.ofArray<V>(this.sequence.filter(predicate));
  }

  public isEmpty(): boolean {
    if (this === ImmutableSequence.empty<V>()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableSequence<W> {
    return ImmutableSequence.ofArray<W>(this.sequence.map<W>(mapper));
  }

  public remove(key: number): ImmutableSequence<V> {
    const sequence: Array<V> = this.removeInternal(key);

    if (sequence === this.sequence) {
      return this;
    }

    return ImmutableSequence.ofArray<V>(sequence);
  }

  public set(key: number, value: V): ImmutableSequence<V> {
    const sequence: Array<V> = this.setInternal(key, value);

    if (sequence === this.sequence) {
      return this;
    }

    return ImmutableSequence.ofArray<V>(sequence);
  }

  public sort(comparator: BinaryFunction<V, V, number>): ImmutableSequence<V> {
    const arr: Array<V> = this.toArray();

    arr.sort(comparator);

    return ImmutableSequence.ofArray<V>(arr);
  }
}
