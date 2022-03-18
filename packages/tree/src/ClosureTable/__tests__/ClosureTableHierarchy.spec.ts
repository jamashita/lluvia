import { MockValueObject } from '@jamashita/anden-object';
import { MockTreeID } from '../../bb/MockTreeID';
import { MockTreeIDFactory } from '../bb/MockTreeIDFactory';
import { ClosureTableHierarchy, ClosureTableJSON } from '../ClosureTableHierarchy';

describe('ClosureTableHierarchy', () => {
  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      const json: ClosureTableJSON = {
        ancestor: '7fc1343b-f086-4951-876f-410067a6937d',
        offspring: 'e45eb02f-837a-40c9-8925-474e2f18faf0'
      };

      const factory: MockTreeIDFactory = new MockTreeIDFactory();

      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.ofJSON<MockTreeID>(json, factory);

      expect(hierarchy.getAncestor().get()).toBe(json.ancestor);
      expect(hierarchy.getOffspring().get()).toBe(json.offspring);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock1'), new MockTreeID('mock2'));

      expect(hierarchy.equals(hierarchy)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock'), new MockTreeID('mock'));

      expect(hierarchy.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      const hierarchy1: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock1'), new MockTreeID('mock2'));
      const hierarchy2: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock3'), new MockTreeID('mock2'));
      const hierarchy3: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock1'), new MockTreeID('mock4'));
      const hierarchy4: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock3'), new MockTreeID('mock4'));
      const hierarchy5: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock1'), new MockTreeID('mock2'));

      expect(hierarchy1.equals(hierarchy2)).toBe(false);
      expect(hierarchy1.equals(hierarchy3)).toBe(false);
      expect(hierarchy1.equals(hierarchy4)).toBe(false);
      expect(hierarchy1.equals(hierarchy5)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns ancestor and offspring', () => {
      const hierarchy: ClosureTableHierarchy<MockTreeID> = ClosureTableHierarchy.of<MockTreeID>(new MockTreeID('mock1'), new MockTreeID('mock2'));

      expect(hierarchy.toString()).toBe('mock1, mock2');
    });
  });
});
