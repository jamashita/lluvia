import { Reject, Resolve, UnaryFunction } from '@jamashita/anden/type';
import { Dictionary } from './Dictionary.js';
import { ReadonlyDictionary } from './ReadonlyDictionary.js';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DictionaryUtil {
  public static await<K, V, D extends Dictionary<K, V>>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>, callback: UnaryFunction<Map<K, V>, D>): Promise<D> {
    if (dictionary.isEmpty()) {
      return Promise.resolve(callback(new Map()));
    }

    let rejected: boolean = false;
    const map: Map<K, V> = new Map();

    return new Promise((resolve: Resolve<D>, reject: Reject) => {
      dictionary.forEach((value: PromiseLike<V>, key: K) => {
        value.then((v: V) => {
          if (rejected) {
            return;
          }

          map.set(key, v);

          if (map.size === dictionary.size()) {
            resolve(callback(map));
          }
        }, (e: unknown) => {
          if (rejected) {
            return;
          }

          rejected = true;

          reject(e);
        });
      });
    });
  }
}
