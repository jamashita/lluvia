import { MockValueObject } from '@jamashita/anden/object';
import { MutableAddress } from '../MutableAddress.js';

describe('MutableAddress', () => {
  describe('await', () => {
    it('returns resolved MutableAddress', async () => {
      await expect(MutableAddress.await(MutableAddress.empty<Promise<unknown>>())).resolves.toBeInstanceOf(MutableAddress);
    });
  });

  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect(MutableAddress.empty()).not.toBe(MutableAddress.empty());
    });

    it('always returns 0-size set', () => {
      expect(MutableAddress.empty().isEmpty()).toBe(true);
    });
  });

  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const address: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([
          new MockValueObject(1),
          new MockValueObject(2)
        ])
      );
      const copied: MutableAddress<MockValueObject<number>> = MutableAddress.of(address);

      expect(address.size()).toBe(copied.size());
      address.forEach((v: MockValueObject<number>) => {
        expect(copied.contains(v)).toBe(true);
      });

      address.add(new MockValueObject(3));

      expect(address.size()).not.toBe(copied.size());
    });
  });

  describe('ofSet', () => {
    it('returns instance', () => {
      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([
          new MockValueObject(1),
          new MockValueObject(3)
        ])
      );
      const address2: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([
          new MockValueObject(2),
          new MockValueObject(4),
          new MockValueObject(5)
        ])
      );

      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(3);
    });
  });

  describe('add', () => {
    it('can extend mutably', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.empty();

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
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.add(value1);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
    });

    it('does nothing when the other same value objects are already contained', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(1);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.add(value3);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
    });
  });

  describe('duplicate', () => {
    it('returns shallow-copied instance', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);
      const value5: MockValueObject<number> = new MockValueObject(5);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
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

  describe('filter', () => {
    it('can remove match values', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);
      const value5: MockValueObject<number> = new MockValueObject(5);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
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

  describe('hashCode', () => {
    it('returns different hash when retaining value is added', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1])
      );
      const hashCode1: string = address1.hashCode();
      const address2: MutableAddress<MockValueObject<number>> = address1.add(value2);
      const hashCode2: string = address2.hashCode();

      expect(hashCode1).not.toBe(hashCode2);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([])
      );

      expect(address1.isEmpty()).toBe(false);
      expect(address2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
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

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: MutableAddress<MockValueObject<number>> = address1.remove(value1);

      expect(address1).toBe(address2);
      expect(address2.size()).toBe(1);
    });

    it('does nothing when there is no such value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address: MutableAddress<MockValueObject<number>> = MutableAddress.ofSet(
        new Set([value1])
      );
      const beforeLength: number = address.size();

      expect(address.remove(value2)).toBe(address);
      expect(address.size()).toBe(beforeLength);
    });

    it('does nothing when Address is empty', () => {
      const address: MutableAddress<MockValueObject<number>> = MutableAddress.empty();

      expect(address.remove(new MockValueObject(1))).toBe(address);
    });
  });
});
