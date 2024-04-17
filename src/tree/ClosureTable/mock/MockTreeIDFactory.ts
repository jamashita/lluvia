import { MockTreeID } from '../../mock/MockTreeID.js';
import type { TreeIDFactory } from '../TreeIDFactory.js';

export class MockTreeIDFactory implements TreeIDFactory<MockTreeID> {
  public forge(id: string): MockTreeID {
    return new MockTreeID(id);
  }
}
