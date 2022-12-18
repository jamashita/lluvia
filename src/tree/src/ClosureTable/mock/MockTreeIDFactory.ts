import { MockTreeID } from '../../mock/MockTreeID';
import { TreeIDFactory } from '../TreeIDFactory';

export class MockTreeIDFactory implements TreeIDFactory<MockTreeID> {
  public forge(id: string): MockTreeID {
    return new MockTreeID(id);
  }
}
