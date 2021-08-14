import { UnimplementedError } from '@jamashita/anden-error';
import { isNominative } from '@jamashita/anden-type';
import { AProject } from '../AProject.js';

export class MockProject<K, V> extends AProject<K, V, MockProject<K, V>, 'MockProject'> {
  public readonly noun: 'MockProject' = 'MockProject';

  private static toMap<KT, VT>(project: Map<KT, VT>): Map<KT | number, [KT, VT]> {
    const map: Map<KT | number, [KT, VT]> = new Map<KT | number, [KT, VT]>();

    project.forEach((v: VT, k: KT) => {
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
