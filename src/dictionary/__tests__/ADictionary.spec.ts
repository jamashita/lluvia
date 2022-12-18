import { MockValueObject } from '@jamashita/anden/object';
import { BinaryPredicate, Nullable } from '@jamashita/anden/type';
import { MockDictionary } from '../mock/MockDictionary.js';

describe('AProject', () => {
  describe('contains', () => {
    it('returns false if the value does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.contains(value2)).toBe(false);
    });

    it('returns true if the value exists', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.contains(value1)).toBe(true);
      expect(dictionary.contains(value2)).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key, value]])
      );

      expect(dictionary.equals(dictionary)).toBe(true);
    });

    it('returns false if the size is different', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(dictionary1.equals(dictionary2)).toBe(false);
    });

    it('returns false when the different class instance given', () => {
      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary<MockValueObject<number>, MockValueObject<number>>(
        new Map()
      );

      expect(dictionary.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns false if the values are different', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value1]
        ])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(dictionary1.equals(dictionary2)).toBe(false);
    });

    it('returns false if the keys are different', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);
      const key3: MockValueObject<number> = new MockValueObject(5);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key3, value2]
        ])
      );

      expect(dictionary1.equals(dictionary2)).toBe(false);
    });

    it('returns true even if the order is different', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key2, value2],
          [key1, value1]
        ])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(dictionary1.equals(dictionary2)).toBe(true);
    });

    it('returns true if the same and the order is the same', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(dictionary1.equals(dictionary2)).toBe(true);
    });
  });

  describe('every', () => {
    it('returns true if all the values are the same', () => {
      const key1: MockValueObject<number> = new MockValueObject(3);
      const key2: MockValueObject<number> = new MockValueObject(6);
      const key3: MockValueObject<number> = new MockValueObject(9);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2],
        [key3, value3]
      ];

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map(kv)
      );

      const every1: boolean = dictionary.every((_: MockValueObject<number>, key: MockValueObject<number>) => {
        return key.get() % 3 === 0;
      });
      const every2: boolean = dictionary.every((value: MockValueObject<number>) => {
        return value.get() % 2 === 0;
      });

      expect(every1).toBe(true);
      expect(every2).toBe(true);
    });

    it('if one of them are not satisfied, returns false', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);
      const key4: MockValueObject<number> = new MockValueObject(4);

      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);
      const value5: MockValueObject<number> = new MockValueObject(3);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value2],
          [key2, value1],
          [key3, value3],
          [key4, value4]
        ])
      );
      const dictionary3: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value2],
          [key2, value3],
          [key3, value1],
          [key4, value4]
        ])
      );
      const dictionary4: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value2],
          [key2, value3],
          [key3, value4],
          [key4, value1]
        ])
      );
      const dictionary5: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value5],
          [key3, value3],
          [key4, value4]
        ])
      );
      const dictionary6: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value5],
          [key4, value4]
        ])
      );

      const predicate: BinaryPredicate<MockValueObject<number>, MockValueObject<number>> = (
        value: MockValueObject<number>
      ) => {
        return value.get() % 2 === 0;
      };

      const every1: boolean = dictionary1.every(predicate);
      const every2: boolean = dictionary2.every(predicate);
      const every3: boolean = dictionary3.every(predicate);
      const every4: boolean = dictionary4.every(predicate);
      const every5: boolean = dictionary5.every(predicate);
      const every6: boolean = dictionary6.every(predicate);

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
      const key1: MockValueObject<string> = new MockValueObject('a');
      const key2: MockValueObject<string> = new MockValueObject('d');
      const key3: MockValueObject<string> = new MockValueObject('g');
      const key4: MockValueObject<string> = new MockValueObject('k');

      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const dictionary: MockDictionary<MockValueObject<string>, MockValueObject<number>> = new MockDictionary(new Map([
        [key1, value1],
        [key2, value2],
        [key3, value3],
        [key4, value4]
      ]));

      const found1: Nullable<MockValueObject<number>> = dictionary.find((v: MockValueObject<number>) => {
        return v.get() === 1;
      });
      const found2: Nullable<MockValueObject<number>> = dictionary.find((v: MockValueObject<number>) => {
        return v.get() === 2;
      });
      const found3: Nullable<MockValueObject<number>> = dictionary.find((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const found4: Nullable<MockValueObject<number>> = dictionary.find((v: MockValueObject<number>) => {
        return v.get() > 1000;
      });
      const found5: Nullable<MockValueObject<number>> = dictionary.find((_v: MockValueObject<number>, k: MockValueObject<string>) => {
        return k.get().length === 1;
      });

      expect(found1).toBe(value1);
      expect(found2).toBe(value2);
      expect(found3).toBe(value2);
      expect(found4).toBeNull();
      expect(found5).toBe(value1);
    });
  });

  describe('forEach', () => {
    it('calls back as much as the size of set', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2]
      ];

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map(kv)
      );
      let i: number = 0;

      expect(dictionary.size()).toBe(kv.length);
      dictionary.forEach((value: MockValueObject<number>, key: MockValueObject<number>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [k, v]: [MockValueObject<number>, MockValueObject<number>] = kv[i]!;

        expect(key).toBe(k);
        expect(value).toBe(v);
        i++;
      });
    });
  });

  describe('get', () => {
    it('returns value at the correct key', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.size()).toBe(1);
      expect(dictionary.get(key1)).toBe(value1);
      expect(dictionary.get(key2)).toBe(value1);
    });

    it('returns null at incorrect keys', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.size()).toBe(1);
      expect(dictionary.get(key2)).toBeNull();
    });
  });

  describe('has', () => {
    it('returns false if the key does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.has(key2)).toBe(false);
    });

    it('returns true if the key exists', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(3);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );

      expect(dictionary.has(key1)).toBe(true);
      expect(dictionary.has(key2)).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the values does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const value1: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([[key1, value1]])
      );
      const dictionary2: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary<MockValueObject<number>, MockValueObject<number>>(
        new Map()
      );

      expect(dictionary1.isEmpty()).toBe(false);
      expect(dictionary2.isEmpty()).toBe(true);
    });
  });

  describe('iterator', () => {
    it('returns [MockValueObject<string>, MockValueObject<number>]', () => {
      const key1: MockValueObject<string> = new MockValueObject('a');
      const key2: MockValueObject<string> = new MockValueObject('d');
      const keys: Array<MockValueObject<string>> = [key1, key2];

      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const dictionary: MockDictionary<MockValueObject<string>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const [k, v] of dictionary) {
        expect(k).toBe(keys[i]);
        expect(v).toBe(values[i]);
        i++;
      }
    });
  });

  describe('keys', () => {
    it('returns its retaining keys', () => {
      const key1: MockValueObject<string> = new MockValueObject('a');
      const key2: MockValueObject<string> = new MockValueObject('d');
      const keys: Array<MockValueObject<string>> = [key1, key2];

      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MockDictionary<MockValueObject<string>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const key of dictionary.keys()) {
        expect(key).toBe(keys[i]);
        i++;
      }
    });
  });

  describe('some', () => {
    it('returns true if at least one of the values returns true', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2],
        [key3, value3]
      ];

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map(kv)
      );

      const predicate: BinaryPredicate<MockValueObject<number>, MockValueObject<number>> = (value: MockValueObject<number>) => {
        return value.get() % 2 === 0;
      };

      const some: boolean = dictionary.some(predicate);

      expect(some).toBe(true);
    });

    it('returns false if none of the values are true', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);
      const key4: MockValueObject<number> = new MockValueObject(4);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);
      const value4: MockValueObject<number> = new MockValueObject(8);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );

      const predicate: BinaryPredicate<MockValueObject<number>, MockValueObject<number>> = (value: MockValueObject<number>) => {
        return value.get() % 2 === 1;
      };

      const some: boolean = dictionary.some(predicate);

      expect(some).toBe(false);
    });
  });

  describe('toMap', () => {
    it('returns its retaining shallow-copied map', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2]
      ];

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map(kv)
      );
      const map: Map<MockValueObject<number>, MockValueObject<number>> = dictionary.toMap();
      let i: number = 0;

      expect(dictionary.size()).toBe(map.size);
      dictionary.forEach((value: MockValueObject<number>, key: MockValueObject<number>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [k, v]: [MockValueObject<number>, MockValueObject<number>] = kv[i]!;

        expect(key).toBe(k);
        expect(value).toBe(v);
        i++;
      });
    });
  });

  describe('toString', () => {
    it('returns key-value concatenated string', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary: MockDictionary<MockValueObject<number>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(dictionary.toString()).toBe('{1: 2}, {3: 4}');
    });
  });

  describe('values', () => {
    it('returns its retaining values', () => {
      const key1: MockValueObject<string> = new MockValueObject('a');
      const key2: MockValueObject<string> = new MockValueObject('d');

      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const dictionary: MockDictionary<MockValueObject<string>, MockValueObject<number>> = new MockDictionary(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const key of dictionary.values()) {
        expect(key).toBe(values[i]);
        i++;
      }
    });
  });
});
