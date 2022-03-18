import { MockValueObject } from '@jamashita/anden-object';
import { Nullable, Predicate } from '@jamashita/anden-type';
import { MockAddress } from '../mock/MockAddress';

describe('AAddress', () => {
  describe('iterator', () => {
    it('returns [void, MockValueObject<number>]', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      let i: number = 0;

      for (const value of address) {
        expect(value[1]).toBe(values[i]);
        i++;
      }
    });
  });

  describe('get', () => {
    it('always returns null', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>()
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1])
      );

      expect(address1.size()).toBe(0);
      expect(address2.get()).toBeNull();
      expect(address2.size()).toBe(1);
      expect(address2.get()).toBeNull();
    });
  });

  describe('contains', () => {
    it('returns false if the value does not exist', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      expect(address.contains(value3)).toBe(false);
    });

    it('returns true if the value exists', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(2);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      expect(address.contains(value1)).toBe(true);
      expect(address.contains(value2)).toBe(true);
      expect(address.contains(value3)).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the values does not exist', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>()
      );

      expect(address1.isEmpty()).toBe(false);
      expect(address2.isEmpty()).toBe(true);
    });
  });

  describe('forEach', () => {
    it('calls back as much as the size of set', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const values: Array<MockValueObject<number>> = [value1, value2, value3];

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>(values)
      );
      let i: number = 0;

      expect(address.size()).toBe(values.length);
      address.forEach((value: MockValueObject<number>) => {
        expect(value).toBe(values[i]);
        i++;
      });
    });
  });

  describe('find', () => {
    it('returns the first found value', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );

      const found1: Nullable<MockValueObject<number>> = address.find((v: MockValueObject<number>) => {
        return v.get() === 1;
      });
      const found2: Nullable<MockValueObject<number>> = address.find((v: MockValueObject<number>) => {
        return v.get() === 2;
      });
      const found3: Nullable<MockValueObject<number>> = address.find((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const found4: Nullable<MockValueObject<number>> = address.find((v: MockValueObject<number>) => {
        return v.get() > 1000;
      });

      expect(found1).toBe(value1);
      expect(found2).toBe(value2);
      expect(found3).toBe(value2);
      expect(found4).toBeNull();
    });
  });

  describe('every', () => {
    it('returns true if all the values are the same', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);
      const value4: MockValueObject<number> = new MockValueObject<number>(8);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );

      const every: boolean = address.every((value: MockValueObject<number>) => {
        return value.get() % 2 === 0;
      });

      expect(every).toBe(true);
    });

    it('returns false if at least one of the values is not false', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);
      const value4: MockValueObject<number> = new MockValueObject<number>(8);
      const value5: MockValueObject<number> = new MockValueObject<number>(3);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value2, value1, value3, value4])
      );
      const address3: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value2, value3, value1, value4])
      );
      const address4: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value2, value3, value4, value1])
      );
      const address5: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value5, value3, value4])
      );
      const address6: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value5, value4])
      );

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      };

      const every1: boolean = address1.every(predicate);
      const every2: boolean = address2.every(predicate);
      const every3: boolean = address3.every(predicate);
      const every4: boolean = address4.every(predicate);
      const every5: boolean = address5.every(predicate);
      const every6: boolean = address6.every(predicate);

      expect(every1).toBe(false);
      expect(every2).toBe(false);
      expect(every3).toBe(false);
      expect(every4).toBe(false);
      expect(every5).toBe(false);
      expect(every6).toBe(false);
    });
  });

  describe('some', () => {
    it('returns true if at least one of the values returns true', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);
      const value4: MockValueObject<number> = new MockValueObject<number>(8);
      const value5: MockValueObject<number> = new MockValueObject<number>(3);
      const value6: MockValueObject<number> = new MockValueObject<number>(5);
      const value7: MockValueObject<number> = new MockValueObject<number>(7);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value5, value6, value7])
      );

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      };

      const some1: boolean = address1.some(predicate);
      const some2: boolean = address2.some(predicate);

      expect(some1).toBe(true);
      expect(some2).toBe(true);
    });

    it('returns false if none of the values are true', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(4);
      const value2: MockValueObject<number> = new MockValueObject<number>(6);
      const value3: MockValueObject<number> = new MockValueObject<number>(8);
      const value4: MockValueObject<number> = new MockValueObject<number>(10);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3, value4])
      );

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 1;
      };

      const some: boolean = address.some(predicate);

      expect(some).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const value: MockValueObject<number> = new MockValueObject<number>(1);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value])
      );

      expect(address.equals(address)).toBe(true);
    });

    it('returns false if the size is different', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      expect(address1.equals(address2)).toBe(false);
    });

    it('returns false when the different class instance given', () => {
      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>()
      );

      expect(address.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true even if the order is different', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value2, value1])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      expect(address1.equals(address2)).toBe(true);
    });

    it('returns true if the size is the same and the order is the quite same', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const address1: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );
      const address2: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      expect(address1.equals(address2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns concatenated string', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2, value3])
      );

      expect(address.toString()).toBe('1, 2, 3');
    });
  });

  describe('toSet', () => {
    it('returns its retaining shallow-copied set', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const values: Array<MockValueObject<number>> = [value1, value2, value3];

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set(values)
      );
      const set: Set<MockValueObject<number>> = address.toSet();

      expect(address.size()).toBe(set.size);

      values.forEach((value: MockValueObject<number>) => {
        expect(set.has(value)).toBe(true);
      });
      set.add(new MockValueObject<number>(4));

      expect(address.size()).not.toBe(set.size);
    });
  });

  describe('values', () => {
    it('returns its retaining values', () => {
      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const address: MockAddress<MockValueObject<number>> = new MockAddress<MockValueObject<number>>(
        new Set<MockValueObject<number>>([value1, value2])
      );

      let i: number = 0;

      for (const value of address.values()) {
        expect(value.get()).toBe(values[i]?.get());
        i++;
      }
    });
  });
});
