import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class MutableProject<K, V> extends AProject<K, V, MutableProject<K, V>> {
  public static empty<K, V>(): MutableProject<K, V> {
    return MutableProject.ofInternal<K, V>(new Map());
  }

  public static of<K, V>(collection: Collection<K, V>): MutableProject<K, V> {
    const map: Map<K, V> = new Map(collection);

    return MutableProject.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | number, [K, V]>): MutableProject<K, V> {
    return new MutableProject(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): MutableProject<K, V> {
    const m: Map<K | number, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      if (isNominative(k)) {
        m.set(k.hashCode(), [k, v]);

        return;
      }

      m.set(k, [k, v]);
    });

    return MutableProject.ofInternal(m);
  }

  protected constructor(project: Map<K | number, [K, V]>) {
    super(project);
  }

  public duplicate(): MutableProject<K, V> {
    return MutableProject.ofInternal(new Map(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): MutableProject<K, V> {
    return MutableProject.ofInternal(this.filterInternal(predicate));
  }

  public map<W>(mapper: Mapper<V, W>): MutableProject<K, W> {
    return MutableProject.ofInternal(this.mapInternal(mapper));
  }

  public remove(key: K): this {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    if (isNominative(key)) {
      this.project.delete(key.hashCode());
    }
    else {
      this.project.delete(key);
    }

    return this;
  }

  public set(key: K, value: V): this {
    if (isNominative(key)) {
      this.project.set(key.hashCode(), [key, value]);
    }
    else {
      this.project.set(key, [key, value]);
    }

    return this;
  }
}
