import { BinaryPredicate, Catalogue, Kind, Mapper, Nullable } from '@jamashita/anden-type';
import {
  ImmutableProject,
  ImmutableSequence,
  MutableAddress,
  MutableProject,
  Quantity,
  ReadonlyAddress
} from '@jamashita/lluvia-collection';
import { TreeID } from '../Interface/TreeID';
import { ClosureTableHierarchies } from './ClosureTableHierarchies';
import { ClosureTableHierarchy } from './ClosureTableHierarchy';

export class ClosureTable<K extends TreeID> extends Quantity<K, ReadonlyAddress<K>, 'ClosureTable'> {
  public readonly noun: 'ClosureTable' = 'ClosureTable';
  private readonly table: ImmutableProject<K, ReadonlyAddress<K>>;

  private static readonly EMPTY: ClosureTable<TreeID> = new ClosureTable<TreeID>(ImmutableProject.empty<TreeID, ReadonlyAddress<TreeID>>());

  public static empty<KT extends TreeID>(): ClosureTable<KT> {
    return ClosureTable.EMPTY as ClosureTable<KT>;
  }

  public static of<KT extends TreeID>(hierarchies: ClosureTableHierarchies<KT>): ClosureTable<KT> {
    if (hierarchies.isEmpty()) {
      return ClosureTable.empty<KT>();
    }

    const project: MutableProject<KT, MutableAddress<KT>> = MutableProject.empty<KT, MutableAddress<KT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<KT>) => {
      const offsprings: Nullable<MutableAddress<KT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<KT> = MutableAddress.empty<KT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return new ClosureTable<KT>(ImmutableProject.of<KT, ReadonlyAddress<KT>>(project));
  }

  protected constructor(table: ImmutableProject<K, ReadonlyAddress<K>>) {
    super();
    this.table = table;
  }

  public contains(value: ReadonlyAddress<K>): boolean {
    return this.table.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTable)) {
      return false;
    }

    return this.table.equals(other.table);
  }

  public every(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): boolean {
    return this.table.every(predicate);
  }

  public filter(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): ImmutableProject<K, ReadonlyAddress<K>> {
    return this.table.filter(predicate);
  }

  public find(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): Nullable<ReadonlyAddress<K>> {
    return this.table.find(predicate);
  }

  public forEach(catalogue: Catalogue<K, ReadonlyAddress<K>>): void {
    this.table.forEach(catalogue);
  }

  public get(key: K): Nullable<ReadonlyAddress<K>> {
    return this.table.get(key);
  }

  public isEmpty(): boolean {
    return this.table.isEmpty();
  }

  public iterator(): Iterator<[K, ReadonlyAddress<K>]> {
    return this.table.iterator();
  }

  public map<W>(mapper: Mapper<ReadonlyAddress<K>, W>): ImmutableProject<K, W> {
    return this.table.map<W>(mapper);
  }

  public serialize(): string {
    return this.table.toString();
  }

  public size(): number {
    return this.table.size();
  }

  public some(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): boolean {
    return this.table.some(predicate);
  }

  public values(): Iterable<ReadonlyAddress<K>> {
    return this.table.values();
  }

  public sort(): ImmutableSequence<K> {
    const keys: Array<K> = [...this.table].sort(([, v1]: [K, ReadonlyAddress<K>], [, v2]: [K, ReadonlyAddress<K>]) => {
      return v1.size() - v2.size();
    }).map<K>(([k]: [K, ReadonlyAddress<K>]) => {
      return k;
    });

    return ImmutableSequence.ofArray<K>(keys);
  }
}
