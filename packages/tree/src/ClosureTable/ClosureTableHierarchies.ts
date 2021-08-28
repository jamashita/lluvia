import { BinaryPredicate, Catalogue, JSONable, Mapper, Nullable } from '@jamashita/anden-type';
import { ReadonlyAddress } from '@jamashita/lluvia-address';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { ReadonlyProject } from '@jamashita/lluvia-project';
import { ImmutableSequence } from '@jamashita/lluvia-sequence';
import { TreeID } from '../TreeID';
import { ClosureTableHierarchy, ClosureTableJSON } from './ClosureTableHierarchy';
import { TreeIDFactory } from './TreeIDFactory';

export class ClosureTableHierarchies<K extends TreeID> extends Quantity<number, ClosureTableHierarchy<K>, 'ClosureTableHierarchies'> implements JSONable<ReadonlyArray<ClosureTableJSON>> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>;

  private static readonly EMPTY: ClosureTableHierarchies<TreeID> = new ClosureTableHierarchies<TreeID>(ImmutableSequence.empty<ClosureTableHierarchy<TreeID>>());

  public static empty<KT extends TreeID>(): ClosureTableHierarchies<KT> {
    return ClosureTableHierarchies.EMPTY as ClosureTableHierarchies<KT>;
  }

  public static of<KT extends TreeID>(hierarchies: ReadonlyProject<KT, ReadonlyAddress<KT>>): ClosureTableHierarchies<KT> {
    const array: Array<ClosureTableHierarchy<KT>> = [];

    hierarchies.forEach((offsprings: ReadonlyAddress<KT>, ancestor: KT) => {
      offsprings.forEach((offspring: KT) => {
        array.push(ClosureTableHierarchy.of<KT>(ancestor, offspring));
      });
    });

    return ClosureTableHierarchies.ofArray<KT>(array);
  }

  public static ofArray<KT extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ClosureTableHierarchies<KT> {
    if (hierarchies.length === 0) {
      return ClosureTableHierarchies.empty<KT>();
    }

    return new ClosureTableHierarchies<KT>(ImmutableSequence.ofArray<ClosureTableHierarchy<KT>>(hierarchies));
  }

  public static ofJSON<KT extends TreeID>(json: ReadonlyArray<ClosureTableJSON>, factory: TreeIDFactory<KT>): ClosureTableHierarchies<KT> {
    const hierarchies: Array<ClosureTableHierarchy<KT>> = json.map<ClosureTableHierarchy<KT>>((j: ClosureTableJSON) => {
      return ClosureTableHierarchy.ofJSON<KT>(j, factory);
    });

    return ClosureTableHierarchies.ofArray<KT>(hierarchies);
  }

  protected constructor(hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>) {
    super();
    this.hierarchies = hierarchies;
  }

  public contains(value: ClosureTableHierarchy<K>): boolean {
    return this.hierarchies.contains(value);
  }

  public equals(other: unknown): boolean {
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

  public forEach(catalogue: Catalogue<number, ClosureTableHierarchy<K>>): void {
    this.hierarchies.forEach(catalogue);
  }

  public get(key: number): Nullable<ClosureTableHierarchy<K>> {
    return this.hierarchies.get(key);
  }

  public override isEmpty(): boolean {
    return this.hierarchies.isEmpty();
  }

  public iterator(): Iterator<[number, ClosureTableHierarchy<K>]> {
    return this.hierarchies.iterator();
  }

  public map<W>(mapper: Mapper<ClosureTableHierarchy<K>, W>): ImmutableSequence<W> {
    return this.hierarchies.map<W>(mapper);
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
    return this.hierarchies.toArray().map<ClosureTableJSON>((hierarchy: ClosureTableHierarchy<K>) => {
      return hierarchy.toJSON();
    });
  }

  public values(): Iterable<ClosureTableHierarchy<K>> {
    return this.hierarchies.values();
  }
}
