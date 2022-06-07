import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class ImmutableProject<in out K, in out V> extends AProject<K, V> {
  private static readonly EMPTY: ImmutableProject<unknown, unknown> = new ImmutableProject(new Map());

  public static empty<K, V>(): ImmutableProject<K, V> {
    return ImmutableProject.EMPTY as ImmutableProject<K, V>;
  }

  public static of<K, V>(collection: Collection<K, V>): ImmutableProject<K, V> {
    const map: Map<K, V> = new Map(collection);

    return ImmutableProject.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | string, [K, V]>): ImmutableProject<K, V> {
    if (project.size === 0) {
      return ImmutableProject.empty();
    }

    return new ImmutableProject(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableProject<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return ImmutableProject.ofInternal(m);
  }

  protected constructor(project: Map<K | string, [K, V]>) {
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

  public map<W>(mapping: Mapping<V, W>): ImmutableProject<K, W> {
    return ImmutableProject.ofInternal(this.mapInternal(mapping));
  }

  public remove(key: K): ImmutableProject<K, V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    const m: Map<K | string, [K, V]> = new Map(this.project);

    m.delete(Quantity.genKey(key));

    return ImmutableProject.ofInternal(m);
  }

  public set(key: K, value: V): ImmutableProject<K, V> {
    const m: Map<K | string, [K, V]> = new Map(this.project);

    m.set(Quantity.genKey(key), [key, value]);

    return ImmutableProject.ofInternal(m);
  }
}
