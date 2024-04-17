import type { Reject, Resolve, UnaryFunction } from '@jamashita/anden/type';
import type { Dictionary } from './Dictionary.js';
import type { ReadonlyDictionary } from './ReadonlyDictionary.js';

export namespace DictionaryUtil {
  export const wait = <K, V, D extends Dictionary<K, V>>(
    dictionary: ReadonlyDictionary<K, PromiseLike<V>>,
    callback: UnaryFunction<Map<K, V>, D>
  ): Promise<D> => {
    if (dictionary.isEmpty()) {
      return Promise.resolve(callback(new Map()));
    }

    let rejected = false;
    const map: Map<K, V> = new Map();

    return new Promise((resolve: Resolve<D>, reject: Reject) => {
      for (const [key, value] of dictionary) {
        value.then(
          (v: V) => {
            if (rejected) {
              return;
            }

            map.set(key, v);

            if (map.size === dictionary.size()) {
              resolve(callback(map));
            }
          },
          (e: unknown) => {
            if (rejected) {
              return;
            }

            rejected = true;

            reject(e);
          }
        );
      }
    });
  };
}
