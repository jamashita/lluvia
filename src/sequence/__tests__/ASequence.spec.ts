import { MockValueObject } from '@jamashita/anden/object';
import type { Nullable, Predicate } from '@jamashita/anden/type';
import { MockSequence } from '../mock/MockSequence.js';

describe('ASequence', () => {
  describe('contains', () => {
    it('returns false if the value does not exist', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);

      expect(sequence.contains(value3)).toBe(false);
    });

    it('returns true if the value exists', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(2);

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);

      expect(sequence.contains(value1)).toBe(true);
      expect(sequence.contains(value2)).toBe(true);
      expect(sequence.contains(value3)).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const value: MockValueObject<number> = new MockValueObject(1);

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([value]);

      expect(sequence.equals(sequence)).toBe(true);
    });

    it('returns false if the size is different', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([value1]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);

      expect(sequence1.equals(sequence2)).toBe(false);
    });

    it('returns false when the different class instance given', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([]);

      expect(sequence.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true even if the order is different', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([value2, value1]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);

      expect(sequence1.equals(sequence2)).toBe(false);
    });

    it('returns true if the length is the same and the sequence is the same', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2]);

      expect(sequence1.equals(sequence2)).toBe(true);
    });
  });

  describe('every', () => {
    it('returns true if all the values are the same', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(6),
        new MockValueObject(8)
      ]);

      const every: boolean = sequence.every((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });

      expect(every).toBe(true);
    });

    it('returns false if at least one of the values is not false', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);
      const value5: MockValueObject<number> = new MockValueObject(3);

      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2, value3, value4]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([value2, value1, value3, value4]);
      const sequence3: MockSequence<MockValueObject<number>> = new MockSequence([value2, value3, value1, value4]);
      const sequence4: MockSequence<MockValueObject<number>> = new MockSequence([value2, value3, value4, value1]);
      const sequence5: MockSequence<MockValueObject<number>> = new MockSequence([value1, value5, value3, value4]);
      const sequence6: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2, value5, value4]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      };

      const every1: boolean = sequence1.every(predicate);
      const every2: boolean = sequence2.every(predicate);
      const every3: boolean = sequence3.every(predicate);
      const every4: boolean = sequence4.every(predicate);
      const every5: boolean = sequence5.every(predicate);
      const every6: boolean = sequence6.every(predicate);

      expect(every1).toBe(false);
      expect(every2).toBe(false);
      expect(every3).toBe(false);
      expect(every4).toBe(false);
      expect(every5).toBe(false);
      expect(every6).toBe(false);
    });
  });

  describe('find', () => {
    it('returns the first found value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2, value3, value4]);

      const found1: Nullable<MockValueObject<number>> = sequence.find((v: MockValueObject<number>) => {
        return v.get() === 1;
      });
      const found2: Nullable<MockValueObject<number>> = sequence.find((v: MockValueObject<number>) => {
        return v.get() === 2;
      });
      const found3: Nullable<MockValueObject<number>> = sequence.find((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const found4: Nullable<MockValueObject<number>> = sequence.find((v: MockValueObject<number>) => {
        return v.get() > 1000;
      });

      expect(found1).toBe(value1);
      expect(found2).toBe(value2);
      expect(found3).toBe(value2);
      expect(found4).toBeNull();
    });
  });

  describe('forEach', () => {
    it('calls back as much as the size of set', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(sequence.size()).toBe(3);
      sequence.forEach((value: MockValueObject<number>, index: number) => {
        expect(sequence.get(index)).toBe(value);
      });
    });
  });

  describe('get', () => {
    it('returns value at the correct key', () => {
      const values: Array<MockValueObject<number>> = [new MockValueObject(1), new MockValueObject(2), new MockValueObject(3)];

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence(values);

      expect(sequence.size()).toBe(values.length);
      for (let i = 0; i < sequence.size(); i++) {
        expect(sequence.get(i)).toBe(values[i]);
      }
    });

    it('returns null at incorrect keys', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(sequence.get(-1)).toBeNull();
      expect(sequence.get(3)).toBeNull();
    });
  });

  describe('isEmpty', () => {
    it('returns true if the values does not exist', () => {
      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([new MockValueObject(1), new MockValueObject(2)]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([]);

      expect(sequence1.isEmpty()).toBe(false);
      expect(sequence2.isEmpty()).toBe(true);
    });
  });

  describe('iterator', () => {
    it('returns [number, MockValueObject<number>]', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([new MockValueObject(1), new MockValueObject(2)]);

      let i = 0;

      for (const value of sequence) {
        expect(value[0]).toBe(i);
        expect(value[1].get()).toBe(sequence.get(i)?.get());
        i++;
      }
    });
  });

  describe('reduce', () => {
    it('throws TypeError when array size is 0 and initialValue is undefined', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([]);

      expect(() => {
        sequence.reduce((_o1: MockValueObject<number>, o2: MockValueObject<number>) => {
          return o2;
        });
      }).toThrow(TypeError);
    });

    it('returns initialValue itself when the array size is 0', () => {
      const o: MockValueObject<number> = new MockValueObject(1);
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([]);

      expect(
        sequence.reduce((_o1: MockValueObject<number>, o2: MockValueObject<number>) => {
          return o2;
        }, o)
      ).toBe(o);
    });

    it('returns first element when the array size is only 1', () => {
      const o: MockValueObject<number> = new MockValueObject(1);
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([o]);

      expect(
        sequence.reduce((o1: MockValueObject<number>) => {
          return o1;
        })
      ).toBe(o);
    });

    it('returns reduced value', () => {
      const sequence: MockSequence<number> = new MockSequence([1, 2, 3, 4]);

      expect(
        sequence.reduce((o1: number, o2: number) => {
          return o1 + o2;
        })
      ).toBe(10);
    });
  });

  describe('some', () => {
    it('returns true if at least one of the values returns true', () => {
      const sequence1: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(6),
        new MockValueObject(8)
      ]);
      const sequence2: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(1),
        new MockValueObject(4),
        new MockValueObject(3),
        new MockValueObject(3)
      ]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      };

      const some1: boolean = sequence1.some(predicate);
      const some2: boolean = sequence2.some(predicate);

      expect(some1).toBe(true);
      expect(some2).toBe(true);
    });

    it('returns false if none of the values are true', () => {
      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([value1, value2, value3, value4]);

      const predicate: Predicate<MockValueObject<number>> = (v: MockValueObject<number>) => {
        return v.get() % 2 === 1;
      };

      const some: boolean = sequence.some(predicate);

      expect(some).toBe(false);
    });
  });

  describe('toArray', () => {
    it('returns its retaining shallow-copied array', () => {
      const values: Array<MockValueObject<number>> = [new MockValueObject(1), new MockValueObject(2), new MockValueObject(3)];

      const sequence: MockSequence<MockValueObject<number>> = new MockSequence(values);
      const array: Array<MockValueObject<number>> = sequence.toArray();

      expect(sequence.size()).toBe(values.length);
      for (let i = 0; i < values.length; i++) {
        expect(sequence.get(i)).toBe(array[i]);
      }

      array.push(new MockValueObject(4));

      expect(sequence.size()).not.toBe(array.length);
    });
  });

  describe('toString', () => {
    it('returns concatenated string', () => {
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);

      expect(sequence.toString()).toBe('1, 2, 3');
    });
  });

  describe('values', () => {
    it('returns its retaining values', () => {
      const values: Array<MockValueObject<number>> = [new MockValueObject(1), new MockValueObject(2)];
      const sequence: MockSequence<MockValueObject<number>> = new MockSequence(values);

      let i = 0;

      for (const value of sequence.values()) {
        expect(value).toBe(values[i]);
        i++;
      }
    });
  });
});
