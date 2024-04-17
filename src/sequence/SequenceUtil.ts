import type { Reject, Resolve, UnaryFunction } from '@jamashita/anden/type';
import type { ReadonlySequence } from './ReadonlySequence.js';
import type { Sequence } from './Sequence.js';

export namespace SequenceUtil {
  export const wait = <V, S extends Sequence<V>>(sequence: ReadonlySequence<PromiseLike<V>>, callback: UnaryFunction<Array<V>, S>): Promise<S> => {
    if (sequence.isEmpty()) {
      return Promise.resolve(callback([]));
    }

    let rejected = false;
    const map: Map<number, V> = new Map();

    return new Promise((resolve: Resolve<S>, reject: Reject) => {
      sequence.forEach((value: PromiseLike<V>, key: number) => {
        value.then(
          (v: V) => {
            if (rejected) {
              return;
            }

            map.set(key, v);

            if (map.size === sequence.size()) {
              const values: Array<V> = [];

              for (let i = 0; i < map.size; i++) {
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                values.push(map.get(i)!);
              }

              resolve(callback(values));
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
      });
    });
  };
}
