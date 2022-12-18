import { UnimplementedError } from '@jamashita/anden/error';
import { Quantity } from '../../collection/index.js';
import { AAddress } from '../AAddress.js';

export class MockAddress<out V> extends AAddress<V> {
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
