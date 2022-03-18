import { BinaryPredicate, Catalogue, Kind, Mapper, Nullable } from '@jamashita/anden-type';
import { MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { Quantity } from '@jamashita/lluvia-collection';
import { ImmutableProject, MutableProject } from '@jamashita/lluvia-project';
import { ImmutableSequence } from '@jamashita/lluvia-sequence';
import { TreeID } from '../TreeID';
import { ClosureTableHierarchies } from './ClosureTableHierarchies';
import { ClosureTableHierarchy } from './ClosureTableHierarchy';

export class ClosureTable<K extends TreeID> extends Quantity<K, ReadonlyAddress<K>> {
  private readonly table: ImmutableProject<K, ReadonlyAddress<K>>;

  private static readonly EMPTY: ClosureTable<TreeID> = new ClosureTable(ImmutableProject.empty());

  public static empty<K extends TreeID>(): ClosureTable<K> {
    return ClosureTable.EMPTY as ClosureTable<K>;
  }

  public static of<K extends TreeID>(hierarchies: ClosureTableHierarchies<K>): ClosureTable<K> {
    if (hierarchies.isEmpty()) {
      return ClosureTable.empty();
    }

    const project: MutableProject<K, MutableAddress<K>> = MutableProject.empty();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<K>) => {
      const offsprings: Nullable<MutableAddress<K>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return new ClosureTable(ImmutableProject.of(project));
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

  public override isEmpty(): boolean {
    return this.table.isEmpty();
  }

  public iterator(): Iterator<[K, ReadonlyAddress<K>]> {
    return this.table.iterator();
  }

  public map<W>(mapper: Mapper<ReadonlyAddress<K>, W>): ImmutableProject<K, W> {
    return this.table.map(mapper);
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

  public sort(): ImmutableSequence<K> {
    const keys: Array<K> = [...this.table].sort(([, v1]: [K, ReadonlyAddress<K>], [, v2]: [K, ReadonlyAddress<K>]) => {
      return v1.size() - v2.size();
    }).map<K>(([k]: [K, ReadonlyAddress<K>]) => {
      return k;
    });

    return ImmutableSequence.ofArray(keys);
  }

  public values(): Iterable<ReadonlyAddress<K>> {
    return this.table.values();
  }
}
