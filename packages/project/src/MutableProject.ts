import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class MutableProject<K, V> extends AProject<K, V, MutableProject<K, V>> {
  public static empty<K, V>(): MutableProject<K, V> {
    return MutableProject.ofInternal<K, V>(new Map<K | number, [K, V]>());
  }

  public static of<K, V>(collection: Collection<K, V>): MutableProject<K, V> {
    const map: Map<K, V> = new Map<K, V>(collection);

    return MutableProject.ofMap<K, V>(map);
  }

  private static ofInternal<K, V>(project: Map<K | number, [K, V]>): MutableProject<K, V> {
    return new MutableProject<K, V>(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): MutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map<K | number, [K, V]>();

    map.forEach((v: V, k: K) => {
      if (isNominative(k)) {
        m.set(k.hashCode(), [k, v]);

        return;
      }

      m.set(k, [k, v]);
    });

    return MutableProject.ofInternal<K, V>(m);
  }

  protected constructor(project: Map<K | number, [K, V]>) {
    super(project);
  }

  public duplicate(): MutableProject<K, V> {
    return MutableProject.ofInternal<K, V>(new Map<K | number, [K, V]>(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): MutableProject<K, V> {
    return MutableProject.ofInternal<K, V>(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableProject<K, W> {
    return MutableProject.ofInternal<K, W>(this.mapInternal<W>(mapper));
  }

  public remove(key: K): MutableProject<K, V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    const k: K | number = this.hashor<K>(key);

    this.project.delete(k);

    return this;
  }

  public set(key: K, value: V): MutableProject<K, V> {
    const k: K | number = this.hashor<K>(key);

    this.project.set(k, [key, value]);

    return this;
  }
}
