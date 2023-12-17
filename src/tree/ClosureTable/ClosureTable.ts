import { BinaryPredicate, ForEach, Kind, Mapping, Nullable } from '@jamashita/anden/type';
import { MutableAddress, ReadonlyAddress } from '../../address/index.js';
import { Quantity } from '../../collection/index.js';
import { ImmutableDictionary, MutableDictionary } from '../../dictionary/index.js';
import { ImmutableSequence } from '../../sequence/index.js';
import { TreeID } from '../TreeID.js';
import { ClosureTableHierarchies } from './ClosureTableHierarchies.js';
import { ClosureTableHierarchy } from './ClosureTableHierarchy.js';

export class ClosureTable<out K extends TreeID> extends Quantity<K, ReadonlyAddress<K>> {
  private readonly table: ImmutableDictionary<K, ReadonlyAddress<K>>;
  private static readonly EMPTY: ClosureTable<TreeID> = new ClosureTable(ImmutableDictionary.empty());

  public static empty<K extends TreeID>(): ClosureTable<K> {
    return ClosureTable.EMPTY as ClosureTable<K>;
  }

  public static of<K extends TreeID>(hierarchies: ClosureTableHierarchies<K>): ClosureTable<K> {
    if (hierarchies.isEmpty()) {
      return ClosureTable.empty();
    }

    const dictionary: MutableDictionary<K, MutableAddress<K>> = MutableDictionary.empty();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<K>) => {
      const offsprings: Nullable<MutableAddress<K>> = dictionary.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty();

        address.add(hierarchy.getOffspring());
        dictionary.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return new ClosureTable(ImmutableDictionary.of(dictionary));
  }

  protected constructor(table: ImmutableDictionary<K, ReadonlyAddress<K>>) {
    super();
    this.table = table;
  }

  public contains(value: ReadonlyAddress<K>): boolean {
    return this.table.contains(value);
  }

  public override equals(other: unknown): boolean {
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

  public filter(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): ImmutableDictionary<K, ReadonlyAddress<K>> {
    return this.table.filter(predicate);
  }

  public find(predicate: BinaryPredicate<ReadonlyAddress<K>, K>): Nullable<ReadonlyAddress<K>> {
    return this.table.find(predicate);
  }

  public forEach(foreach: ForEach<K, ReadonlyAddress<K>>): void {
    this.table.forEach(foreach);
  }

  public get(key: K): Nullable<ReadonlyAddress<K>> {
    return this.table.get(key);
  }

  public override hashCode(): string {
    return this.table.hashCode();
  }

  public override isEmpty(): boolean {
    return this.table.isEmpty();
  }

  public iterator(): IterableIterator<[K, ReadonlyAddress<K>]> {
    return this.table.iterator();
  }

  public map<W>(mapping: Mapping<ReadonlyAddress<K>, W>): ImmutableDictionary<K, W> {
    return this.table.map(mapping);
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
    }).map(([k]: [K, ReadonlyAddress<K>]) => {
      return k;
    });

    return ImmutableSequence.ofArray(keys);
  }

  public values(): IterableIterator<ReadonlyAddress<K>> {
    return this.table.values();
  }
}
