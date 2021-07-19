import { MockTreeID } from '../../Mock/MockTreeID.js';
import { TreeIDFactory } from '../TreeIDFactory.js';

export class MockTreeIDFactory implements TreeIDFactory<MockTreeID> {
  public forge(id: string): MockTreeID {
    return new MockTreeID(id);
  }
}
