import { MockTreeID } from '../../mock/MockTreeID.js';
import { ClosureTableHierarchy, type ClosureTableJSON } from '../ClosureTableHierarchy.js';
import { MockTreeIDFactory } from '../mock/MockTreeIDFactory.js';

describe('ClosureTableHierarchy', () => {
  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      const json: ClosureTableJSON = {
        ancestor: '7fc1343b-f086-4951-876f-410067a6937d',
        offspring: 'e45eb02f-837a-40c9-8925-474e2f18faf0'
      };

      const factory: MockTreeIDFactory = new MockTreeIDFactory();

      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.ofJSON(json, factory);

      expect(hierarchy.getAncestor().get()).toBe(json.ancestor);
      expect(hierarchy.getOffspring().get()).toBe(json.offspring);
    });
  });

  describe('toString', () => {
    it('returns ancestor and offspring', () => {
      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of(new MockTreeID('mock1'), new MockTreeID('mock2'));

      expect(hierarchy.toString()).toBe('mock1, mock2');
    });
  });
});
