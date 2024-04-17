import type { Reject, Resolve, UnaryFunction } from '@jamashita/anden/type';
import type { Address } from './Address.js';
import type { ReadonlyAddress } from './ReadonlyAddress.js';

export namespace AddressUtil {
  export const wait = <V, A extends Address<V>>(address: ReadonlyAddress<PromiseLike<V>>, callback: UnaryFunction<Set<V>, A>): Promise<A> => {
    if (address.isEmpty()) {
      return Promise.resolve(callback(new Set()));
    }

    let rejected = false;
    const set: Set<V> = new Set();

    return new Promise((resolve: Resolve<A>, reject: Reject) => {
      for (const value of address.values()) {
        value.then(
          (v: V) => {
            if (rejected) {
              return;
            }

            set.add(v);

            if (set.size === address.size()) {
              resolve(callback(set));
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
