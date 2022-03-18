import { UnimplementedError } from '@jamashita/anden-error';
import { ASequence } from '../ASequence';

export class MockSequence<V> extends ASequence<V, MockSequence<V>> {
  public constructor(sequence: ReadonlyArray<V>) {
    super([...sequence]);
  }

  public add(): MockSequence<V> {
    throw new UnimplementedError();
  }

  public duplicate(): MockSequence<V> {
    throw new UnimplementedError();
  }

  public filter(): MockSequence<V> {
    throw new UnimplementedError();
  }

  public map<W>(): MockSequence<W> {
    throw new UnimplementedError();
  }

  public remove(): MockSequence<V> {
    throw new UnimplementedError();
  }

  public set(): MockSequence<V> {
    throw new UnimplementedError();
  }

  public sort(): MockSequence<V> {
    throw new UnimplementedError();
  }
}
