import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { ADictionary } from './ADictionary';

export class MutableDictionary<out K, out V> extends ADictionary<K, V> {
  public static empty<K, V>(): MutableDictionary<K, V> {
    return MutableDictionary.ofInternal<K, V>(new Map());
  }

  public static of<K, V>(collection: Collection<K, V>): MutableDictionary<K, V> {
    const map: Map<K, V> = new Map(collection);

    return MutableDictionary.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | string, [K, V]>): MutableDictionary<K, V> {
    return new MutableDictionary(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): MutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return MutableDictionary.ofInternal(m);
  }

  protected constructor(project: Map<K | string, [K, V]>) {
    super(project);
  }

  public duplicate(): MutableDictionary<K, V> {
    return MutableDictionary.ofInternal(new Map(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): MutableDictionary<K, V> {
    return MutableDictionary.ofInternal(this.filterInternal(predicate));
  }

  public map<W>(mapping: Mapping<V, W>): MutableDictionary<K, W> {
    return MutableDictionary.ofInternal(this.mapInternal(mapping));
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
