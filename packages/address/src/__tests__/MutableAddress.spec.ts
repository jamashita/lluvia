import { MockValueObject } from '@jamashita/anden-object';
import { MutableAddress } from '../MutableAddress.js';

describe('MutableAddress', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      expect.assertions(4);

      const address: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([
          new MockValueObject<number>(1),
          new MockValueObject<number>(2)
        ])
      );
      const copied: MutableAddress<MockValueObject<number>> = MutableAddress.of<MockValueObject<number>>(address);

      expect(address.size()).toBe(copied.size());
      address.forEach((v: MockValueObject<number>) => {
        expect(copied.contains(v)).toBe(true);
      });

      address.add(new MockValueObject<number>(3));

      expect(address.size()).not.toBe(copied.size());
    });
  });

  describe('ofSet', () => {
    it('returns instance', () => {
      expect.assertions(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([
          new MockValueObject<number>(1),
          new MockValueObject<number>(3)
        ])
      );
      const address2: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([
          new MockValueObject<number>(2),
          new MockValueObject<number>(4),
          new MockValueObject<number>(5)
        ])
      );

      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(3);
    });
  });

  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect.assertions(1);

      expect(MutableAddress.empty<MockValueObject<number>>()).not.toBe(MutableAddress.empty<MockValueObject<number>>());
    });

    it('always returns 0-size set', () => {
      expect.assertions(1);

      expect(MutableAddress.empty<MockValueObject<number>>().isEmpty()).toBe(true);
    });
  });

  describe('add', () => {
    it('can extend mutably', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.empty<MockValueObject<number>>();

      expect(address1.size()).toBe(0);

      const address2: MutableAddress<MockValueObject<number>> = address1.add(value1);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(1);

      const address3: MutableAddress<MockValueObject<number>> = address2.add(value2).add(value3);

      expect(address1).toBe(address2);
      expect(address2).toBe(address3);
      expect(address1.size()).toBe(3);
    });

    it('does nothing when the address are already contained', () => {
      expect.assertions(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.add(value1);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
    });

    it('does nothing when the other same value objects are already contained', () => {
      expect.assertions(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(1);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.add(value3);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
    });
  });

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      expect.assertions(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.remove(value1);

      expect(address1).toBe(address2);
      expect(address2.size()).toBe(1);
    });

    it('does nothing when there is no such value', () => {
      expect.assertions(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1])
      );
      const beforeLength: number = address.size();

      expect(address.remove(value2)).toBe(address);
      expect(address.size()).toBe(beforeLength);
    });

    it('does nothing when Address is empty', () => {
      expect.assertions(1);

      const address: MutableAddress<MockValueObject<number>> = MutableAddress.empty<MockValueObject<number>>();

      expect(address.remove(new MockValueObject<number>(1))).toBe(address);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      expect.assertions(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([])
      );

      expect(address1.isEmpty()).toBe(false);
      expect(address2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.map((v: MockValueObject<number>) => {
        return new MockValueObject(v.get() * 2);
      });

      expect(address1.size()).toBe(address2.size());
      expect(address1).not.toBe(address2);
      address2.forEach((v: MockValueObject<number>) => {
        expect(v.get() % 2).toBe(0);
      });
    });
  });

  describe('filter', () => {
    it('can remove match values', () => {
      expect.assertions(4);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);
      const value5: MockValueObject<number> = new MockValueObject<number>(5);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );
      const filtered1: MutableAddress<MockValueObject<number>> = address1.filter((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const filtered2: MutableAddress<MockValueObject<number>> = address1.filter((v: MockValueObject<number>) => {
        return v === value5;
      });

      expect(filtered1.size()).toBe(2);
      expect(filtered1.contains(value2)).toBe(true);
      expect(filtered1.contains(value4)).toBe(true);
      expect(filtered2.size()).toBe(0);
    });
  });

  describe('duplicate', () => {
    it('returns shallow-copied instance', () => {
      expect.assertions(7);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);
      const value5: MockValueObject<number> = new MockValueObject<number>(5);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.duplicate();

      expect(address1.size()).toBe(address2.size());
      expect(address1).not.toBe(address2);
      expect(address2).toBe(address2.add(value5));
      address1.forEach((v: MockValueObject<number>) => {
        expect(address2.contains(v)).toBe(true);
      });
    });
  });
});
