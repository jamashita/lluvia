import { Reject, Resolve, UnaryFunction } from '@jamashita/anden-type';
import { Address } from './Address';
import { ReadonlyAddress } from './ReadonlyAddress';

export class AddressUtil {
  public static await<V, A extends Address<V>>(address: ReadonlyAddress<PromiseLike<V>>, callback: UnaryFunction<Set<V>, A>): Promise<A> {
    if (address.isEmpty()) {
      return Promise.resolve(callback(new Set()));
    }

    let rejected: boolean = false;
    const set: Set<V> = new Set();

    return new Promise((resolve: Resolve<A>, reject: Reject) => {
      address.forEach((value: PromiseLike<V>) => {
        value.then((v: V) => {
          if (rejected) {
            return;
          }

          set.add(v);

          if (set.size === address.size()) {
            resolve(callback(set));
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
