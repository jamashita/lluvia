import { BinaryPredicate, isNominative, Mapper } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { AProject } from './AProject';

export class MutableProject<K, V> extends AProject<K, V, MutableProject<K, V>, 'MutableProject'> {
  public readonly noun: 'MutableProject' = 'MutableProject';

  public static empty<KT, VT>(): MutableProject<KT, VT> {
    return MutableProject.ofInternal<KT, VT>(new Map<KT | number, [KT, VT]>());
  }

  public static of<KT, VT>(collection: Collection<KT, VT>): MutableProject<KT, VT> {
    const map: Map<KT, VT> = new Map<KT, VT>(collection);

    return MutableProject.ofMap<KT, VT>(map);
  }

  private static ofInternal<KT, VT>(project: Map<KT | number, [KT, VT]>): MutableProject<KT, VT> {
    return new MutableProject<KT, VT>(project);
  }

  public static ofMap<KT, VT>(map: ReadonlyMap<KT, VT>): MutableProject<KT, VT> {
    const m: Map<KT | number, [KT, VT]> = new Map<KT | number, [KT, VT]>();

    map.forEach((v: VT, k: KT) => {
      if (isNominative(k)) {
        m.set(k.hashCode(), [k, v]);

        return;
      }

      m.set(k, [k, v]);
    });

    return MutableProject.ofInternal<KT, VT>(m);
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
