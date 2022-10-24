import { BinaryPredicate, Mapping } from '@jamashita/anden-type';
import { Collection, Quantity } from '@jamashita/lluvia-collection';
import { ADictionary } from './ADictionary';

export class ImmutableDictionary<out K, out V> extends ADictionary<K, V> {
  private static readonly EMPTY: ImmutableDictionary<unknown, unknown> = new ImmutableDictionary(new Map());

  public static empty<K, V>(): ImmutableDictionary<K, V> {
    return ImmutableDictionary.EMPTY as ImmutableDictionary<K, V>;
  }

  public static of<K, V>(collection: Collection<K, V>): ImmutableDictionary<K, V> {
    const map: Map<K, V> = new Map(collection);

    return ImmutableDictionary.ofMap(map);
  }

  private static ofInternal<K, V>(project: Map<K | string, [K, V]>): ImmutableDictionary<K, V> {
    if (project.size === 0) {
      return ImmutableDictionary.empty();
    }

    return new ImmutableDictionary(project);
  }

  public static ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map();

    map.forEach((v: V, k: K) => {
      m.set(Quantity.genKey(k), [k, v]);
    });

    return ImmutableDictionary.ofInternal(m);
  }

  protected constructor(project: Map<K | string, [K, V]>) {
    super(project);
  }

  public duplicate(): ImmutableDictionary<K, V> {
    if (this.isEmpty()) {
      return ImmutableDictionary.empty();
    }

    return ImmutableDictionary.ofInternal(new Map(this.project));
  }

  public filter(predicate: BinaryPredicate<V, K>): ImmutableDictionary<K, V> {
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

    const m: Map<K | string, [K, V]> = new Map(this.project);

    m.delete(Quantity.genKey(key));

    return ImmutableDictionary.ofInternal(m);
  }

  public set(key: K, value: V): ImmutableDictionary<K, V> {
    const m: Map<K | string, [K, V]> = new Map(this.project);

    m.set(Quantity.genKey(key), [key, value]);

    return ImmutableDictionary.ofInternal(m);
  }
}
