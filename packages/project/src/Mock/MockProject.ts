import { UnimplementedError } from '@jamashita/anden-error';
import { isNominative } from '@jamashita/anden-type';
import { AProject } from '../AProject';

export class MockProject<K, V> extends AProject<K, V, MockProject<K, V>> {
  private static toMap<K, V>(project: Map<K, V>): Map<K | number, [K, V]> {
    const map: Map<K | number, [K, V]> = new Map<K | number, [K, V]>();

    project.forEach((v: V, k: K) => {
      if (isNominative(k)) {
        map.set(k.hashCode(), [k, v]);

        return;
      }

      map.set(k, [k, v]);
    });

    return map;
  }

  public constructor(project: Map<K, V>) {
    super(MockProject.toMap<K, V>(project));
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
