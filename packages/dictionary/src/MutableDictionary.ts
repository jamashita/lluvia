import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { ADictionary } from './ADictionary';
import { DictionaryUtil } from './DictionaryUtil';
import { ReadonlyDictionary } from './ReadonlyDictionary';

export class MutableDictionary<out K, out V> extends ADictionary<K, V> {
  public static await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<MutableDictionary<K, V>> {
    return DictionaryUtil.await(dictionary, (values: Map<K, V>) => {
      return MutableDictionary.ofMap(values);
    });
  }

  public static empty<K, V>(): MutableDictionary<K, V> {
    return MutableDictionary.ofInternal<K, V>(new Map());
  }

  public static of<K, V>(collection: Collection<K, V>): MutableDictionary<K, V> {
    const map: Map<K, V> = new Map(collection);

    return MutableDictionary.ofMap(map);
  }

  private static ofInternal<K, V>(dictionary: Map<K | string, [K, V]>): MutableDictionary<K, V> {
    return new MutableDictionary(dictionary);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): MutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return MutableDictionary.ofInternal(m);
  }

  protected constructor(dictionary: Map<K | string, [K, V]>) {
    super(dictionary);
  }

  public duplicate(): MutableDictionary<K, V> {
    return MutableDictionary.ofInternal(new Map(this.dictionary));
  }

  public filter(predicate: BinaryPredicate<V, K>): MutableDictionary<K, V>;
  public filter<W extends V>(predicate: BinaryPredicate<W, K>): MutableDictionary<K, W>;
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

    this.dictionary.delete(Quantity.genKey(key));

    return this;
  }

  public set(key: K, value: V): this {
    this.dictionary.set(Quantity.genKey(key), [key, value]);

    return this;
  }
}
