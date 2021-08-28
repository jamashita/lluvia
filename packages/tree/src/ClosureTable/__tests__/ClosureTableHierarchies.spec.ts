import { MockValueObject } from '@jamashita/anden-object';
import { ImmutableAddress, MockAddress } from '@jamashita/lluvia-address';
import { ImmutableProject } from '@jamashita/lluvia-project';
import sinon, { SinonSpy } from 'sinon';
import { MockTreeID } from '../../Mock/MockTreeID';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { ClosureTableHierarchy, ClosureTableJSON } from '../ClosureTableHierarchy';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';
import { MockTreeIDFactory } from '../Mock/MockTreeIDFactory';

describe('ClosureTableHierarchies', () => {
  describe('of', () => {
    it('returns flattened ClosureTableHierarchies', () => {
      expect.assertions(23);

      const project: ImmutableProject<MockTreeID, ImmutableAddress<MockTreeID>> = ImmutableProject.ofMap<MockTreeID, ImmutableAddress<MockTreeID>>(new Map<MockTreeID, ImmutableAddress<MockTreeID>>([
        [new MockTreeID('mock 1'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 1'), new MockTreeID('mock 2'), new MockTreeID('mock 3'), new MockTreeID('mock 4'), new MockTreeID('mock 5')]))],
        [new MockTreeID('mock 2'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 2'), new MockTreeID('mock 4'), new MockTreeID('mock 5')]))],
        [new MockTreeID('mock 3'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 3')]))],
        [new MockTreeID('mock 4'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 4')]))],
        [new MockTreeID('mock 5'), ImmutableAddress.ofSet<MockTreeID>(new Set<MockTreeID>([new MockTreeID('mock 5')]))]
      ]));

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.of<MockTreeID>(project);

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
      expect.assertions(1);

      expect(ClosureTableHierarchies.ofArray<MockTreeID>([])).toBe(ClosureTableHierarchies.empty<MockTreeID>());
    });
  });

  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      expect.assertions(5);

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

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofJSON<MockTreeID>(json, factory);

      expect(hierarchies.size()).toBe(json.length);
      for (let i: number = 0; i < hierarchies.size(); i++) {
        expect(hierarchies.get(i)?.getAncestor().get()).toBe(json[i]?.ancestor);
        expect(hierarchies.get(i)?.getOffspring().get()).toBe(json[i]?.offspring);
      }
    });
  });

  describe('empty', () => {
    it('\'s size is 0', () => {
      expect.assertions(1);

      expect(ClosureTableHierarchies.empty<MockTreeID>().size()).toBe(0);
    });

    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(ClosureTableHierarchies.empty<MockTreeID>()).toBe(ClosureTableHierarchies.empty<MockTreeID>());
    });
  });

  describe('iterator', () => {
    it('returns [void, ClosureTableHierarchy]', () => {
      expect.assertions(3);

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray<MockTreeID>(array);
      let i: number = 0;

      for (const [, v] of hierarchies) {
        expect(v).toBe(array[i]);
        i++;
      }
    });
  });

  describe('contains', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.contains = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.contains(new MockClosureTableHierarchy(new MockTreeID('mock'), new MockTreeID('mock')));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray<MockTreeID>(array);

      expect(hierarchies.equals(hierarchies)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray<MockTreeID>(array);

      expect(hierarchies.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.equals = spy;

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray<MockTreeID>(array);
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.equals(ClosureTableHierarchies.empty());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.every = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.forEach = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.get = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.get(0);

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.isEmpty = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.toString = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.size = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.some = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.values = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('filter', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.filter = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.filter(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('find', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.find = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.find(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('map', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<MockTreeID>> = new MockAddress<ClosureTableHierarchy<MockTreeID>>(new Set<ClosureTableHierarchy<MockTreeID>>());

      address.map = spy;

      const hierarchies: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.empty<MockTreeID>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.map((hierarchy: ClosureTableHierarchy<MockTreeID>) => {
        return hierarchy;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns ReadonlyArray<ClosureTableJSON>', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<MockTreeID>> = [
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 1'), new MockTreeID('mock 2')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 3'), new MockTreeID('mock 4')),
        new MockClosureTableHierarchy<MockTreeID>(new MockTreeID('mock 5'), new MockTreeID('mock 6'))
      ];

      const hierarchy: ClosureTableHierarchies<MockTreeID> = ClosureTableHierarchies.ofArray<MockTreeID>(array);

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
});
