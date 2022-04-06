import { UnimplementedError } from '@jamashita/anden-error';
import { Quantity } from '@jamashita/lluvia-collection';
import { AAddress } from '../AAddress';

export class MockAddress<V> extends AAddress<V, MockAddress<V>> {
  public constructor(set: ReadonlySet<V>) {
    const map: Map<V | string, V> = new Map();

    set.forEach((v: V) => {
      map.set(Quantity.genKey(v), v);
    });

    super(map);
  }

  public add(): MockAddress<V> {
    throw new UnimplementedError();
  }

  public duplicate(): MockAddress<V> {
    throw new UnimplementedError();
  }

  public filter(): MockAddress<V> {
    throw new UnimplementedError();
  }

  public map<W>(): MockAddress<W> {
    throw new UnimplementedError();
  }

  public remove(): MockAddress<V> {
    throw new UnimplementedError();
  }
}
