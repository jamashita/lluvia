import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class ImmutableProject<K, V> extends AProject<K, V, ImmutableProject<K, V>> {
  private static readonly EMPTY: ImmutableProject<unknown, unknown> = new ImmutableProject<unknown, unknown>(new Map<unknown, [unknown, unknown]>());

  public static empty<K, V>(): ImmutableProject<K, V> {
    return ImmutableProject.EMPTY as ImmutableProject<K, V>;
  }

  public static of<K, V>(collection: Collection<K, V>): ImmutableProject<K, V> {
    const map: Map<K, V> = new Map<K, V>(collection);

    return ImmutableProject.ofMap<K, V>(map);
  }

  private static ofInternal<K, V>(project: Map<K | number, [K, V]>): ImmutableProject<K, V> {
    if (project.size === 0) {
      return ImmutableProject.empty<K, V>();
    }

    return new ImmutableProject<K, V>(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map<K | number, [K, V]>();

    map.forEach((v: V, k: K) => {
      if (isNominative(k)) {
        m.set(k.hashCode(), [k, v]);

        return;
      }

      m.set(k, [k, v]);
    });

    return ImmutableProject.ofInternal<K, V>(m);
  }

  protected constructor(project: Map<K | number, [K, V]>) {
    super(project);
  }

  public duplicate(): ImmutableProject<K, V> {
    if (this.isEmpty()) {
      return ImmutableProject.empty<K, V>();
    }

    return ImmutableProject.ofInternal<K, V>(new Map<K | number, [K, V]>(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): ImmutableProject<K, V> {
    return ImmutableProject.ofInternal<K, V>(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableProject.empty<K, V>()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapper: Mapper<V, W>): ImmutableProject<K, W> {
    return ImmutableProject.ofInternal<K, W>(this.mapInternal<W>(mapper));
  }

  public remove(key: K): ImmutableProject<K, V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    const m: Map<K | number, [K, V]> = new Map<K | number, [K, V]>(this.project);
    const k: K | number = this.hashor<K>(key);

    m.delete(k);

    return ImmutableProject.ofInternal<K, V>(m);
  }

  public set(key: K, value: V): ImmutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map<K | number, [K, V]>(this.project);
    const k: K | number = this.hashor<K>(key);

    m.set(k, [key, value]);

    return ImmutableProject.ofInternal<K, V>(m);
  }
}
