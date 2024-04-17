import type { BinaryFunction, BinaryPredicate, Mapping } from '@jamashita/anden/type';
import type { Collection, NarrowingBinaryPredicate } from '../collection/index.js';
import { ASequence } from './ASequence.js';
import type { ReadonlySequence } from './ReadonlySequence.js';
import { SequenceUtil } from './SequenceUtil.js';

export class ImmutableSequence<out V> extends ASequence<V> {
  private static readonly EMPTY: ImmutableSequence<unknown> = new ImmutableSequence<unknown>([]);

  public static await<V>(sequence: ReadonlySequence<PromiseLike<V>>): Promise<ImmutableSequence<V>> {
    return SequenceUtil.wait(sequence, (values: Array<V>) => {
      return ImmutableSequence.ofArray(values);
    });
  }

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

  public filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ImmutableSequence<W>;
  public filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<V>;
  public filter<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, number>): ImmutableSequence<W> {
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
