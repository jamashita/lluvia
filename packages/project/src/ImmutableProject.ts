import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class ImmutableProject<K, V> extends AProject<K, V, ImmutableProject<K, V>> {
  private static readonly EMPTY: ImmutableProject<unknown, unknown> = new ImmutableProject(new Map());

  public static empty<K, V>(): ImmutableProject<K, V> {
    return ImmutableProject.EMPTY as ImmutableProject<K, V>;
  }

  public static of<K, V>(collection: Collection<K, V>): ImmutableProject<K, V> {
    const map: Map<K, V> = new Map(collection);

    return ImmutableProject.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | number, [K, V]>): ImmutableProject<K, V> {
    if (project.size === 0) {
      return ImmutableProject.empty();
    }

    return new ImmutableProject(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      if (isNominative(k)) {
        m.set(k.hashCode(), [k, v]);

        return;
      }

      m.set(k, [k, v]);
    });

    return ImmutableProject.ofInternal(m);
  }

  protected constructor(project: Map<K | number, [K, V]>) {
    super(project);
  }

  public duplicate(): ImmutableProject<K, V> {
    if (this.isEmpty()) {
      return ImmutableProject.empty();
    }

    return ImmutableProject.ofInternal(new Map(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): ImmutableProject<K, V> {
    return ImmutableProject.ofInternal(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableProject.empty()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableProject<K, W> {
    return ImmutableProject.ofInternal(this.mapInternal(mapper));
  }

  public remove(key: K): ImmutableProject<K, V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    const m: Map<K | number, [K, V]> = new Map(this.project);
    const k: K | number = this.hashor(key);

    m.delete(k);

    return ImmutableProject.ofInternal(m);
  }

  public set(key: K, value: V): ImmutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map(this.project);
    const k: K | number = this.hashor(key);

    m.set(k, [key, value]);

    return ImmutableProject.ofInternal(m);
  }
}
