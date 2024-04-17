import { MockValueObject } from '@jamashita/anden/object';
import type { SpyInstance } from 'vitest';
import { ImmutableAddress, MockAddress } from '../../../address/index.js';
import { ImmutableDictionary } from '../../../dictionary/index.js';
import { MockTreeID } from '../../mock/MockTreeID.js';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies.js';
import type { ClosureTableHierarchy, ClosureTableJSON } from '../ClosureTableHierarchy.js';
import { MockClosureTableHierarchy } from '../mock/MockClosureTableHierarchy.js';
import { MockTreeIDFactory } from '../mock/MockTreeIDFactory.js';

describe('ClosureTableHierarchies', () => {
  describe('empty', () => {
    it("'s size is 0", () => {
      expect(ClosureTableHierarchies.empty().size()).toBe(0);
    });

    it('returns singleton instance', () => {
      expect(ClosureTableHierarchies.empty()).toBe(ClosureTableHierarchies.empty());
    });
  });

  describe('of', () => {
    it('returns flattened ClosureTableHierarchies', () => {
      const dictionary: ImmutableDictionary<MockTreeID, ImmutableAddress<MockTreeID>> = ImmutableDictionary.ofMap(
        new Map([
          [
            new MockTreeID('mock 1'),
            ImmutableAddress.ofSet<MockTreeID>(
              new Set<MockTreeID>([
                new MockTreeID('mock 1'),
                new MockTreeID('mock 2'),
                new MockTreeID('mock 3'),
                new MockTreeID('mock 4'),
                new MockTreeID('mock 5')
              ])
            )
          ],
          [
            new MockTreeID('mock 2'),
            ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 2'), new MockTreeID('mock 4'), new MockTreeID('mock 5')]))
          ],
          [new MockTreeID('mock 3'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 3')]))],
          [new MockTreeID('mock 4'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 4')]))],
          [new MockTreeID('mock 5'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 5')]))]
        ])
      );

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.of(dictionary);

      expect(hierarchies.size()).toBe(11);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(5)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(5)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(6)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(6)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(7)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(7)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(8)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(8)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(9)?.getAncestor().get()).toBe('mock 4');
      expect(hierarchies.get(9)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(10)?.getAncestor().get()).toBe('mock 5');
      expect(hierarchies.get(10)?.getOffspring().get()).toBe('mock 5');
    });
  });

  describe('ofArray', () => {
    it('returns ClosureTableHierarchies.empty() when 0-length array given', () => {
      expect(ClosureTableHierarchies.ofArray([])).toBe(ClosureTableHierarchies.empty());
    });
  });

  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      const json: Array<ClosureTableJSON> = [
        {
          ancestor: '7fc1343b-f086-4951-876f-410067a6937d',
          offspring: 'e45eb02f-837a-40c9-8925-474e2f18faf0'
        },
        {
          ancestor: '8aa8813a-caac-451b-acd1-768f06ff87b5',
          offspring: 'd104cb7b-dcf3-40de-9d22-5d80473c2a06'
        }
      ];

      const factory: MockTreeIDFactory = new MockTreeIDFactory();

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofJSON(json, factory);

      expect(hierarchies.size()).toBe(json.length);
      for (let i = 0; i < hierarchies.size(); i++) {
        expect(hierarchies.get(i)?.getAncestor().get()).toBe(json[i]?.ancestor);
        expect(hierarchies.get(i)?.getOffspring().get()).toBe(json[i]?.offspring);
      }
    });
  });

  describe('contains', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'contains');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.contains(new MockClosureTableHierarchy(new MockTreeID('mock'), new MockTreeID('mock')));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray(array);

      expect(hierarchies.equals(hierarchies)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray(array);

      expect(hierarchies.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'equals');

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray(array);
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.equals(ClosureTableHierarchies.empty());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('every', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'every');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.every(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      // @ts-expect-error
      const spy: SpyInstance = vi.spyOn(address, 'filter').mockImplementation(() => {
        return true;
      });

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.filter(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'find');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.find(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('forEach', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'forEach');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      // biome-ignore lint/complexity/noForEach: <explanation>
      hierarchies.forEach(() => {
        // NOOP
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'get');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.get(0);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isEmpty', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'isEmpty');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.isEmpty();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('iterator', () => {
    it('returns [void, ClosureTableHierarchy]', () => {
      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray(array);
      let i = 0;

      for (const [, v] of hierarchies) {
        expect(v).toBe(array[i]);
        i++;
      }
    });
  });

  describe('map', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      // @ts-expect-error
      const spy: SpyInstance = vi.spyOn(address, 'map').mockImplementation((a: MockAddress<unknown>) => {
        return a;
      });

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.map((hierarchy: ClosureTableHierarchy<MockTreeID>) => {
        return hierarchy;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('size', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'size');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.size();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('some', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'some');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.some(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('toJSON', () => {
    it('returns ReadonlyArray<ClosureTableJSON>', () => {
      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchy: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray(array);

      expect(hierarchy.toJSON()).toStrictEqual([
        {
          ancestor: 'mock 1',
          offspring: 'mock 2'
        },
        {
          ancestor: 'mock 3',
          offspring: 'mock 4'
        },
        {
          ancestor: 'mock 5',
          offspring: 'mock 6'
        }
      ]);
    });
  });

  describe('values', () => {
    it('deletes its retaining address', () => {
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress(new Set());

      const spy: SpyInstance = vi.spyOn(address, 'values');

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.values();

      expect(spy).toHaveBeenCalled();
    });
  });
});
