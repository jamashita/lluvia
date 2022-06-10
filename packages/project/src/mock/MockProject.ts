import { UnimplementedError } from '@jamashita/anden-error';
import { Quantity } from '@jamashita/lluvia-collection';
import { AProject } from '../AProject';

export class MockProject<out K, out V> extends AProject<K, V> {
  public constructor(project: Map<K, V>) {
    const map: Map<K | string, [K, V]> = new Map();

    project.forEach((v: V, k: K) => {
      map.set(Quantity.genKey(k), [k, v]);
    });

    super(map);
  }

  public duplicate(): MockProject<K, V> {
    throw new UnimplementedError();
  }

  public filter(): MockProject<K, V> {
    throw new UnimplementedError();
  }

  public map<W>(): MockProject<K, W> {
    throw new UnimplementedError();
  }

  public remove(): MockProject<K, V> {
    throw new UnimplementedError();
  }

  public set(): MockProject<K, V> {
    throw new UnimplementedError();
  }
}
