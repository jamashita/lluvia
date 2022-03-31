import { MockAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { MockProject, Project } from '@jamashita/lluvia-project';
import { ReadonlySequence } from '@jamashita/lluvia-sequence';
import { MockTreeID } from '../../mock/MockTreeID';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { MockClosureTable } from '../mock/MockClosureTable';
import { MockClosureTableHierarchies } from '../mock/MockClosureTableHierarchies';
import { MockClosureTableHierarchy } from '../mock/MockClosureTableHierarchy';

describe('ClosureTable', () => {
  describe('empty', () => {
    it('returns singleton instance', () => {
      expect(ClosureTable.empty()).toBe(ClosureTable.empty());
    });

    it('\'s size is 0', () => {
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
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.contains = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.contains(new MockAddress<MockTreeID>(new Set([new MockTreeID('mock')])));

      expect(fn.mock.calls).toHaveLength(1);
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
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.equals = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.equals(new MockClosureTable());

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.every = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.every(() => {
        return true;
      });

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('filter', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.filter = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.filter(() => {
        return true;
      });

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('find', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.find = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.find(() => {
        return true;
      });

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.forEach = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.forEach(() => {
        // NOOP
      });

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.get = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.get(new MockTreeID('mock'));

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.isEmpty = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.isEmpty();

      expect(fn.mock.calls).toHaveLength(1);
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
      let i: number = 0;

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
            fail();
            break;
          }
        }
      }
    });
  });

  describe('map', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.map = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.map((offsprings: ReadonlyAddress<MockTreeID>) => {
        return offsprings;
      });

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.size = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.size();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.some = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.some(() => {
        return true;
      });

      expect(fn.mock.calls).toHaveLength(1);
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

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.toString = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.toString();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      const fn: jest.Mock = jest.fn();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject(new Map());

      project.values = fn;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      // @ts-expect-error
      table.table = project;

      table.values();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });
});
