import { BinaryPredicate, ForEach, JSONifiable, Mapping, Nullable } from '@jamashita/anden/type';
import { ReadonlyAddress } from '../../address/index.js';
import { Collection, Quantity } from '../../collection/index.js';
import { ReadonlyDictionary } from '../../dictionary/index.js';
import { ImmutableSequence } from '../../sequence/index.js';
import { TreeID } from '../TreeID.js';
import { ClosureTableHierarchy, ClosureTableJSON } from './ClosureTableHierarchy.js';
import { TreeIDFactory } from './TreeIDFactory.js';

export class ClosureTableHierarchies<out K extends TreeID> extends Quantity<number, ClosureTableHierarchy<K>> implements JSONifiable<ReadonlyArray<ClosureTableJSON>> {
  private readonly hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>;
  private static readonly EMPTY: ClosureTableHierarchies<TreeID> = new ClosureTableHierarchies(ImmutableSequence.empty());

  public static empty<K extends TreeID>(): ClosureTableHierarchies<K> {
    return ClosureTableHierarchies.EMPTY as ClosureTableHierarchies<K>;
  }

  public static of<K extends TreeID>(hierarchies: ReadonlyDictionary<K, ReadonlyAddress<K>>): ClosureTableHierarchies<K> {
    const array: Array<ClosureTableHierarchy<K>> = [];

    hierarchies.forEach((offsprings: ReadonlyAddress<K>, ancestor: K) => {
      offsprings.forEach((offspring: K) => {
        array.push(ClosureTableHierarchy.of(ancestor, offspring));
      });
    });

    return ClosureTableHierarchies.ofArray(array);
  }

  public static ofArray<K extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>): ClosureTableHierarchies<K> {
    if (hierarchies.length === 0) {
      return ClosureTableHierarchies.empty();
    }

    return new ClosureTableHierarchies(ImmutableSequence.ofArray(hierarchies));
  }

  public static ofJSON<K extends TreeID>(json: ReadonlyArray<ClosureTableJSON>, factory: TreeIDFactory<K>): ClosureTableHierarchies<K> {
    const hierarchies: Array<ClosureTableHierarchy<K>> = json.map((j: ClosureTableJSON): ClosureTableHierarchy<K> => {
      return ClosureTableHierarchy.ofJSON(j, factory);
    });

    return ClosureTableHierarchies.ofArray(hierarchies);
  }

  protected constructor(hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>) {
    super();
    this.hierarchies = hierarchies;
  }

  public contains(value: ClosureTableHierarchy<K>): boolean {
    return this.hierarchies.contains(value);
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTableHierarchies)) {
      return false;
    }

    return this.hierarchies.equals(other.hierarchies);
  }

  public every(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): boolean {
    return this.hierarchies.every(predicate);
  }

  public filter(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): Collection<number, ClosureTableHierarchy<K>> {
    return this.hierarchies.filter(predicate);
  }

  public find(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): Nullable<ClosureTableHierarchy<K>> {
    return this.hierarchies.find(predicate);
  }

  public forEach(foreach: ForEach<number, ClosureTableHierarchy<K>>): void {
    this.hierarchies.forEach(foreach);
  }

  public get(key: number): Nullable<ClosureTableHierarchy<K>> {
    return this.hierarchies.get(key);
  }

  public override hashCode(): string {
    return this.hierarchies.hashCode();
  }

  public override isEmpty(): boolean {
    return this.hierarchies.isEmpty();
  }

  public iterator(): IterableIterator<[number, ClosureTableHierarchy<K>]> {
    return this.hierarchies.iterator();
  }

  public map<W>(mapping: Mapping<ClosureTableHierarchy<K>, W>): ImmutableSequence<W> {
    return this.hierarchies.map(mapping);
  }

  public serialize(): string {
    return this.hierarchies.toString();
  }

  public size(): number {
    return this.hierarchies.size();
  }

  public some(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): boolean {
    return this.hierarchies.some(predicate);
  }

  public toJSON(): ReadonlyArray<ClosureTableJSON> {
    return this.hierarchies.toArray().map((hierarchy: ClosureTableHierarchy<K>): ClosureTableJSON => {
      return hierarchy.toJSON();
    });
  }

  public values(): IterableIterator<ClosureTableHierarchy<K>> {
    return this.hierarchies.values();
  }
}
