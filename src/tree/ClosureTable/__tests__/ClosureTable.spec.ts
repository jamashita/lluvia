import type { SpyInstance } from 'vitest';
import { MockAddress, type ReadonlyAddress } from '../../../address/index.js';
import { type Dictionary, MockDictionary } from '../../../dictionary/index.js';
import type { ReadonlySequence } from '../../../sequence/index.js';
import { MockTreeID } from '../../mock/MockTreeID.js';
import { ClosureTable } from '../ClosureTable.js';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies.js';
import { MockClosureTable } from '../mock/MockClosureTable.js';
import { MockClosureTableHierarchies } from '../mock/MockClosureTableHierarchies.js';
import { MockClosureTableHierarchy } from '../mock/MockClosureTableHierarchy.js';

describe('ClosureTable', () => {
  describe('empty', () => {
    it('returns singleton instance', () => {
      expect(ClosureTable.empty()).toBe(ClosureTable.empty());
    });

    it("'s size is 0", () => {
      expect(ClosureTable.empty().size()).toBe(0);
    });
  });

  describe('of', () => {
    it('returns ClosureTable.empty() ClosureTableHierarchies.empty() given', () => {
      expect(ClosureTable.of(ClosureTableHierarchies.empty())).toBe(ClosureTable.empty());
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'contains');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.contains(new MockAddress<MockTreeID>(new Set([new MockTreeID('mock')])));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const table: ClosureTable<MockTreeID> = ClosureTable.empty();

      expect(table.equals(table)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      const table: ClosureTable<MockTreeID> = ClosureTable.empty();

      expect(table.equals(new MockTreeID('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'equals');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.equals(new MockClosureTable());

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'every');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.every(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('filter', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      // @ts-expect-error
      const spy: SpyInstance = vi.spyOn(dictionary, 'filter').mockImplementation(() => {
        return true;
      });

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.filter(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'find');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.find(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'forEach');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      // biome-ignore lint/complexity/noForEach: <explanation>
      table.forEach(() => {
        // NOOP
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'get');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.get(new MockTreeID('mock'));

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'isEmpty');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.isEmpty();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('iterator', () => {
    it('returns [K, ReadonlyAddress<K>]', () => {
      const hierarchies: ClosureTableHierarchies<MockTreeID> = new MockClosureTableHierarchies(
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 10')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 11')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 03'))
      );

      const table: ClosureTable<MockTreeID> = ClosureTable.of(hierarchies);
      let i = 0;

      for (const [, v] of table) {
        switch (i) {
          case 0: {
            const vs: Array<MockTreeID> = [...v.values()];

            expect(vs).toHaveLength(4);
            expect(vs[0]).toBe(hierarchies.get(0)?.getOffspring());
            expect(vs[1]).toBe(hierarchies.get(2)?.getOffspring());
            expect(vs[2]).toBe(hierarchies.get(3)?.getOffspring());
            expect(vs[3]).toBe(hierarchies.get(6)?.getOffspring());
            i++;
            break;
          }
          case 1: {
            const vs: Array<MockTreeID> = [...v.values()];

            expect(vs).toHaveLength(3);
            expect(vs[0]).toBe(hierarchies.get(1)?.getOffspring());
            expect(vs[1]).toBe(hierarchies.get(4)?.getOffspring());
            expect(vs[2]).toBe(hierarchies.get(5)?.getOffspring());
            i++;
            break;
          }
          default: {
            throw new Error();
          }
        }
      }
    });
  });

  describe('map', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      // @ts-expect-error
      const spy: SpyInstance = vi.spyOn(dictionary, 'map').mockImplementation((a: Dictionary<MockTreeID, unknown>) => {
        return a;
      });

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.map((offsprings: ReadonlyAddress<MockTreeID>) => {
        return offsprings;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'size');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.size();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'some');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.some(() => {
        return true;
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('sort', () => {
    it('returns desc ordered pairs', () => {
      const hierarchies: ClosureTableHierarchies<MockTreeID> = new MockClosureTableHierarchies(
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 03')),
        new MockClosureTableHierarchy(new MockTreeID('mock 12'), new MockTreeID('mock 03'))
      );

      const table: ClosureTable<MockTreeID> = ClosureTable.of(hierarchies);
      const keys: ReadonlySequence<MockTreeID> = table.sort();

      expect(keys.size()).toBe(3);
      expect(keys.get(0)?.toString()).toBe('mock 12');
      expect(keys.get(1)?.toString()).toBe('mock 11');
      expect(keys.get(2)?.toString()).toBe('mock 10');
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      const dictionary: Dictionary<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockDictionary(new Map());

      const spy: SpyInstance = vi.spyOn(dictionary, 'values');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = dictionary;

      table.values();

      expect(spy).toHaveBeenCalled();
    });
  });
});
