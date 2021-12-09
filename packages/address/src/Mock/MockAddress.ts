import { UnimplementedError } from '@jamashita/anden-error';
import { isNominative } from '@jamashita/anden-type';
import { AAddress } from '../AAddress';

export class MockAddress<V> extends AAddress<V, MockAddress<V>> {
  private static toMap<V>(set: ReadonlySet<V>): Map<V | number, V> {
    const m: Map<V | number, V> = new Map<V | number, V>();

    set.forEach((v: V) => {
      if (isNominative(v)) {
        m.set(v.hashCode(), v);

        return;
      }

      m.set(v, v);
    });

    return m;
  }

  public constructor(set: ReadonlySet<V>) {
    super(MockAddress.toMap<V>(set));
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
