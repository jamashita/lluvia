import { MockAddress, MockProject, Project, ReadonlyAddress, ReadonlySequence } from '@jamashita/lluvia-collection';
import sinon, { SinonSpy } from 'sinon';
import { MockTreeID } from '../../Mock/MockTreeID';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { MockClosureTable } from '../Mock/MockClosureTable';
import { MockClosureTableHierarchies } from '../Mock/MockClosureTableHierarchies';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';

describe('ClosureTable', () => {
  describe('of', () => {
    it('returns ClosureTable.empty() ClosureTableHierarchies.empty() given', () => {
      expect.assertions(1);

      expect(ClosureTable.of<MockTreeID>(ClosureTableHierarchies.empty<MockTreeID>())).toBe(ClosureTable.empty<MockTreeID>());
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(ClosureTable.empty<MockTreeID>()).toBe(ClosureTable.empty<MockTreeID>());
    });

    it('\'s size is 0', () => {
      expect.assertions(1);

      expect(ClosureTable.empty<MockTreeID>().size()).toBe(0);
    });
  });

  describe('iterator', () => {
    it('returns [K, ReadonlyAddress<K>]', () => {
      expect.assertions(9);

      const hierarchies: ClosureTableHierarchies<MockTreeID> = new MockClosureTableHierarchies(
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 10')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 11')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 03'))
      );

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(hierarchies);
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

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.contains = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.contains(new MockAddress<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock')])));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();

      expect(table.equals(table)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();

      expect(table.equals(new MockTreeID('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.equals = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.equals(new MockClosureTable<MockTreeID>());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.every = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.forEach = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.get = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.get(new MockTreeID('mock'));

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.isEmpty = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.toString = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.size = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.some = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.values = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('filter', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.filter = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.filter(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('find', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.find = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.find(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });
  describe('map', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<MockTreeID, ReadonlyAddress<MockTreeID>> = new MockProject<MockTreeID, ReadonlyAddress<MockTreeID>>(new Map<MockTreeID, ReadonlyAddress<MockTreeID>>());

      project.map = spy;

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      // @ts-expect-error
      table.table = project;

      table.map((offsprings: ReadonlyAddress<MockTreeID>) => {
        return offsprings;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('sort', () => {
    it('returns desc ordered pairs', () => {
      expect.assertions(4);

      const hierarchies: ClosureTableHierarchies<MockTreeID> = new MockClosureTableHierarchies(
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 02')),
        new MockClosureTableHierarchy(new MockTreeID('mock 11'), new MockTreeID('mock 01')),
        new MockClosureTableHierarchy(new MockTreeID('mock 10'), new MockTreeID('mock 03')),
        new MockClosureTableHierarchy(new MockTreeID('mock 12'), new MockTreeID('mock 03'))
      );

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(hierarchies);
      const keys: ReadonlySequence<MockTreeID> = table.sort();

      expect(keys.size()).toBe(3);
      expect(keys.get(0)?.toString()).toBe('mock 12');
      expect(keys.get(1)?.toString()).toBe('mock 11');
      expect(keys.get(2)?.toString()).toBe('mock 10');
    });
  });
});
