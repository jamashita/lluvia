import type { BinaryPredicate, Mapping } from '@jamashita/anden/type';
import { type Collection, type NarrowingBinaryPredicate, Quantity } from '../collection/index.js';
import { ADictionary } from './ADictionary.js';
import { DictionaryUtil } from './DictionaryUtil.js';
import type { ReadonlyDictionary } from './ReadonlyDictionary.js';

export class ImmutableDictionary<out K, out V> extends ADictionary<K, V> {
  private static readonly EMPTY: ImmutableDictionary<unknown, unknown> = new ImmutableDictionary(new Map());

  public static await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<ImmutableDictionary<K, V>> {
    return DictionaryUtil.wait(dictionary, (values: Map<K, V>) => {
      return ImmutableDictionary.ofMap(values);
    });
  }

  public static empty<K, V>(): ImmutableDictionary<K, V> {
    return ImmutableDictionary.EMPTY as ImmutableDictionary<K, V>;
  }

  public static of<K, V>(collection: Collection<K, V>): ImmutableDictionary<K, V> {
    const map: Map<K, V> = new Map(collection);

    return ImmutableDictionary.ofMap(map);
  }

  private static ofInternal<K, V>(dictionary: Map<K | string, [K, V]>): ImmutableDictionary<K, V> {
    if (dictionary.size === 0) {
      return ImmutableDictionary.empty();
    }

    return new ImmutableDictionary(dictionary);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return ImmutableDictionary.ofInternal(m);
  }

  protected constructor(dictionary: Map<K | string, [K, V]>) {
    super(dictionary);
  }

  public duplicate(): ImmutableDictionary<K, V> {
    if (this.isEmpty()) {
      return ImmutableDictionary.empty();
    }

    return ImmutableDictionary.ofInternal(new Map(this.dictionary));
  }

  public filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ImmutableDictionary<K, W>;
  public filter(predicate: BinaryPredicate<V, K>): ImmutableDictionary<K, V>;
  public filter<W extends V = V>(predicate: NarrowingBinaryPredicate<V, W, K>): ImmutableDictionary<K, W> {
    return ImmutableDictionary.ofInternal(this.filterInternal(predicate));
  }

  public override isEmpty(): boolean {
    if (this === ImmutableDictionary.empty()) {
      return true;
    }

    return super.isEmpty();
  }

  public map<W>(mapping: Mapping<V, W>): ImmutableDictionary<K, W> {
    return ImmutableDictionary.ofInternal(this.mapInternal(mapping));
  }

  public remove(key: K): ImmutableDictionary<K, V> {
    if (this.isEmpty()) {
      return this;
    }
    if (!this.has(key)) {
      return this;
    }

    const m: Map<K | string, [K, V]> = new Map(this.dictionary);

    m.delete(Quantity.genKey(key));

    return ImmutableDictionary.ofInternal(m);
  }

  public set(key: K, value: V): ImmutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map(this.dictionary);

    m.set(Quantity.genKey(key), [key, value]);

    return ImmutableDictionary.ofInternal(m);
  }
}
