import { MockValueObject } from '@jamashita/anden-object';
import { ImmutableAddress } from '../ImmutableAddress';

describe('ImmutableAddress', () => {
  describe('empty', () => {
    it('returns singleton instance', () => {
      expect(ImmutableAddress.empty()).toBe(ImmutableAddress.empty());
    });

    it('always returns 0-size set', () => {
      expect(ImmutableAddress.empty().isEmpty()).toBe(true);
    });
  });

  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const address: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([
          new MockValueObject(1),
          new MockValueObject(2)
        ])
      );
      const copied: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.of(address);

      expect(address.size()).toBe(copied.size());
      address.forEach((v: MockValueObject<number>) => {
        expect(copied.contains(v)).toBe(true);
      });

      address.add(new MockValueObject(3));

      expect(address.size()).toBe(copied.size());
    });
  });

  describe('ofSet', () => {
    it('returns ImmutableAddress.empty() when the size is 0', () => {
      const address: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(new Set());

      expect(address.isEmpty()).toBe(true);
      expect(address).toBe(ImmutableAddress.empty());
    });

    it('returns instance', () => {
      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([new MockValueObject(1), new MockValueObject(3)])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
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
    it('can extend immutably', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.empty();

      expect(address1.size()).toBe(0);

      const address2: ImmutableAddress<MockValueObject<number>> = address1.add(value1);

      expect(address1).not.toBe(address2);
      expect(address1.size()).toBe(0);
      expect(address2.size()).toBe(1);

      const address3: ImmutableAddress<MockValueObject<number>> = address2.add(value2).add(value3);

      expect(address1).not.toBe(address2);
      expect(address2).not.toBe(address3);
      expect(address3).not.toBe(address1);
      expect(address1.size()).toBe(0);
      expect(address2.size()).toBe(1);
      expect(address3.size()).toBe(3);
    });

    it('does nothing when the arguments are already contained', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = address1.add(value1);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(2);
    });

    it('does nothing when the other same value object are already contained', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(1);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(new Set([value1, value2]));
      const address2: ImmutableAddress<MockValueObject<number>> = address1.add(value3);

      expect(address1).toBe(address2);
      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(2);
    });
  });

  describe('duplicate', () => {
    it('returns ImmutableAddress.empty() when there are no values', () => {
      const address: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set()
      );

      expect(address.duplicate()).toBe(ImmutableAddress.empty());
    });

    it('returns shallow-copied instance', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);
      const value5: MockValueObject<number> = new MockValueObject(5);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = address1.duplicate();

      expect(address1.size()).toBe(address2.size());
      expect(address1).not.toBe(address2);
      expect(address2).not.toBe(address2.add(value5));
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

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
      );
      const filtered1: ImmutableAddress<MockValueObject<number>> = address1.filter((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const filtered2: ImmutableAddress<MockValueObject<number>> = address1.filter((v: MockValueObject<number>) => {
        return v === value5;
      });

      expect(filtered1.size()).toBe(2);
      expect(filtered1.contains(value2)).toBe(true);
      expect(filtered1.contains(value4)).toBe(true);
      expect(filtered2.size()).toBe(0);
    });

    it('returns ImmutableAddress.empty() when matches nothing', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
      );
      const filtered: ImmutableAddress<MockValueObject<number>> = address1.filter((v: MockValueObject<number>) => {
        return v.get() > 100;
      });

      expect(filtered.size()).toBe(0);
      expect(filtered).toBe(ImmutableAddress.empty());
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
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

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2, value3, value4])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = address1.map((v: MockValueObject<number>): MockValueObject<number> => {
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

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = address1.remove(value1);

      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(1);
    });

    it('does nothing when there is no such value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const address: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1])
      );
      const beforeLength: number = address.size();

      expect(address.remove(value2)).toBe(address);
      expect(address.size()).toBe(beforeLength);
    });

    it('returns the removed Address', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(2);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(
        new Set([value1, value2])
      );
      const address2: ImmutableAddress<MockValueObject<number>> = address1.remove(value3);

      expect(address1).not.toBe(address2);
      expect(address1.size()).toBe(2);
      expect(address2.size()).toBe(1);
    });

    it('returns ImmutableAddress.empty() when the size will be 0', () => {
      const value: MockValueObject<number> = new MockValueObject(1);

      const address1: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.ofSet(new Set([value]));
      const address2: ImmutableAddress<MockValueObject<number>> = address1.remove(value);

      expect(address2).toBe(ImmutableAddress.empty());
    });

    it('does nothing when Address is empty', () => {
      const address: ImmutableAddress<MockValueObject<number>> = ImmutableAddress.empty();

      expect(address.remove(new MockValueObject(1))).toBe(address);
    });
  });
});
