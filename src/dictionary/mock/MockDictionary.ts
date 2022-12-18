import { UnimplementedError } from '@jamashita/anden/error';
import { Quantity } from '../../collection/index.js';
import { ADictionary } from '../ADictionary.js';

export class MockDictionary<out K, out V> extends ADictionary<K, V> {
  public constructor(dictionary: Map<K, V>) {
    const map: Map<K | string, [K, V]> = new Map();

    dictionary.forEach((v: V, k: K) => {
      map.set(Quantity.genKey(k), [k, v]);
    });

    super(map);
  }

  public duplicate(): MockDictionary<K, V> {
    throw new UnimplementedError();
  }

  public filter(): MockDictionary<K, V> {
    throw new UnimplementedError();
  }

  public map<W>(): MockDictionary<K, W> {
    throw new UnimplementedError();
  }

  public remove(): MockDictionary<K, V> {
    throw new UnimplementedError();
  }

  public set(): MockDictionary<K, V> {
    throw new UnimplementedError();
  }
}
