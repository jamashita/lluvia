import { BinaryFunction, BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { ASequence } from './ASequence';

export class ImmutableSequence<in out V> extends ASequence<V> {
  private static readonly EMPTY: ImmutableSequence<unknown> = new ImmutableSequence<unknown>([]);

  public static empty<V>(): ImmutableSequence<V> {
    return ImmutableSequence.EMPTY as ImmutableSequence<V>;
  }

  public static of<V>(collection: Collection<number, V>): ImmutableSequence<V> {
    return ImmutableSequence.ofInternal([...collection.values()]);
  }

  public static ofArray<V>(array: ReadonlyArray<V>): ImmutableSequence<V> {
    return ImmutableSequence.ofInternal([...array]);
  }

  private static ofInternal<V>(array: Array<V>): ImmutableSequence<V> {
    if (array.length === 0) {
      return ImmutableSequence.empty();
    }

    return new ImmutableSequence(array);
  }

  protected constructor(sequence: Array<V>) {
    super(sequence);
  }

  public add(value: V): ImmutableSequence<V> {
    return ImmutableSequence.ofArray([...this.sequence, value]);
  }

  public duplicate(): ImmutableSequence<V> {
    if (this.isEmpty()) {
      return ImmutableSequence.empty();
    }

    return ImmutableSequence.ofArray([...this.sequence]);
  }

  public filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<V> {
    return ImmutableSequence.ofArray(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableSequence.empty()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapping: Mapping<V, W>): ImmutableSequence<W> {
    return ImmutableSequence.ofArray(this.sequence.map(mapping));
  }

  public remove(key: number): ImmutableSequence<V> {
    const sequence: Array<V> = this.removeInternal(key);

    if (sequence === this.sequence) {
      return this;
    }

    return ImmutableSequence.ofArray(sequence);
  }

  public set(key: number, value: V): ImmutableSequence<V> {
    const sequence: Array<V> = this.setInternal(key, value);

    if (sequence === this.sequence) {
      return this;
    }

    return ImmutableSequence.ofArray(sequence);
  }

  public sort(comparator: BinaryFunction<V, V, number>): ImmutableSequence<V> {
    const arr: Array<V> = this.toArray();

    arr.sort(comparator);

    return ImmutableSequence.ofArray(arr);
  }
}
