import { UnimplementedError } from '@jamashita/anden-error';
import { isNominative } from '@jamashita/anden-type';
import { AAddress } from '../AAddress.js';

export class MockAddress<V> extends AAddress<V, MockAddress<V>, 'MockAddress'> {
  public readonly noun: 'MockAddress' = 'MockAddress';

  private static toMap<VT>(set: ReadonlySet<VT>): Map<VT | string, VT> {
    const m: Map<VT | string, VT> = new Map<VT | string, VT>();

    set.forEach((v: VT) => {
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
