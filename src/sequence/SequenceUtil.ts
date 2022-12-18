import { Reject, Resolve, UnaryFunction } from '@jamashita/anden/type';
import { ReadonlySequence } from './ReadonlySequence.js';
import { Sequence } from './Sequence.js';

export class SequenceUtil {
  public static await<V, S extends Sequence<V>>(sequence: ReadonlySequence<PromiseLike<V>>, callback: UnaryFunction<Array<V>, S>): Promise<S> {
    if (sequence.isEmpty()) {
      return Promise.resolve(callback([]));
    }

    let rejected: boolean = false;
    const map: Map<number, V> = new Map();

    return new Promise((resolve: Resolve<S>, reject: Reject) => {
      sequence.forEach((value: PromiseLike<V>, key: number) => {
        value.then((v: V) => {
          if (rejected) {
            return;
          }

          map.set(key, v);

          if (map.size === sequence.size()) {
            const values: Array<V> = [];

            for (let i: number = 0; i < map.size; i++) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              values.push(map.get(i)!);
            }

            resolve(callback(values));
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
