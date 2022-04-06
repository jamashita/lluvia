import { BinaryPredicate, Mapper } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class MutableProject<K, V> extends AProject<K, V, MutableProject<K, V>> {
  public static empty<K, V>(): MutableProject<K, V> {
    return MutableProject.ofInternal<K, V>(new Map());
  }

  public static of<K, V>(collection: Collection<K, V>): MutableProject<K, V> {
    const map: Map<K, V> = new Map(collection);

    return MutableProject.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | string, [K, V]>): MutableProject<K, V> {
    return new MutableProject(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): MutableProject<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return MutableProject.ofInternal(m);
  }

  protected constructor(project: Map<K | string, [K, V]>) {
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

    this.project.delete(Quantity.genKey(key));

    return this;
  }

  public set(key: K, value: V): this {
    this.project.set(Quantity.genKey(key), [key, value]);

    return this;
  }
}
