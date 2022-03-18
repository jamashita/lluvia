import { MockValueObject } from '@jamashita/anden-object';
import { BinaryPredicate, Nullable } from '@jamashita/anden-type';
import { MockProject } from '../mock/MockProject';

describe('AProject', () => {
  describe('iterator', () => {
    it('returns [MockValueObject<string>, MockValueObject<number>]', () => {
      const key1: MockValueObject<string> = new MockValueObject<string>('a');
      const key2: MockValueObject<string> = new MockValueObject<string>('d');
      const keys: Array<MockValueObject<string>> = [key1, key2];

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const project: MockProject<MockValueObject<string>, MockValueObject<number>> = new MockProject<MockValueObject<string>,
        MockValueObject<number>>(
        new Map<MockValueObject<string>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const [k, v] of project) {
        expect(k).toBe(keys[i]);
        expect(v).toBe(values[i]);
        i++;
      }
    });
  });

  describe('get', () => {
    it('returns value at the correct key', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.size()).toBe(1);
      expect(project.get(key1)).toBe(value1);
      expect(project.get(key2)).toBe(value1);
    });

    it('returns null at incorrect keys', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.size()).toBe(1);
      expect(project.get(key2)).toBeNull();
    });
  });

  describe('has', () => {
    it('returns false if the key does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.has(key2)).toBe(false);
    });

    it('returns true if the key exists', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(3);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.has(key1)).toBe(true);
      expect(project.has(key2)).toBe(true);
    });
  });

  describe('contains', () => {
    it('returns false if the value does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.contains(value2)).toBe(false);
    });

    it('returns true if the value exists', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );

      expect(project.contains(value1)).toBe(true);
      expect(project.contains(value2)).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the values does not exist', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const value1: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>()
      );

      expect(project1.isEmpty()).toBe(false);
      expect(project2.isEmpty()).toBe(true);
    });
  });

  describe('forEach', () => {
    it('calls back as much as the size of set', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2]
      ];

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>(kv)
      );
      let i: number = 0;

      expect(project.size()).toBe(kv.length);
      project.forEach((value: MockValueObject<number>, key: MockValueObject<number>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [k, v]: [MockValueObject<number>, MockValueObject<number>] = kv[i]!;

        expect(key).toBe(k);
        expect(value).toBe(v);
        i++;
      });
    });
  });

  describe('every', () => {
    it('returns true if all the values are the same', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(3);
      const key2: MockValueObject<number> = new MockValueObject<number>(6);
      const key3: MockValueObject<number> = new MockValueObject<number>(9);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2],
        [key3, value3]
      ];

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>(kv)
      );

      const every1: boolean = project.every((_: MockValueObject<number>, key: MockValueObject<number>) => {
        return key.get() % 3 === 0;
      });
      const every2: boolean = project.every((value: MockValueObject<number>) => {
        return value.get() % 2 === 0;
      });

      expect(every1).toBe(true);
      expect(every2).toBe(true);
    });

    it('if one of them are not satisfied, returns false', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);
      const key3: MockValueObject<number> = new MockValueObject<number>(3);
      const key4: MockValueObject<number> = new MockValueObject<number>(4);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);
      const value4: MockValueObject<number> = new MockValueObject<number>(8);
      const value5: MockValueObject<number> = new MockValueObject<number>(3);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value2],
          [key2, value1],
          [key3, value3],
          [key4, value4]
        ])
      );
      const project3: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value2],
          [key2, value3],
          [key3, value1],
          [key4, value4]
        ])
      );
      const project4: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value2],
          [key2, value3],
          [key3, value4],
          [key4, value1]
        ])
      );
      const project5: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value5],
          [key3, value3],
          [key4, value4]
        ])
      );
      const project6: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
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

      const every1: boolean = project1.every(predicate);
      const every2: boolean = project2.every(predicate);
      const every3: boolean = project3.every(predicate);
      const every4: boolean = project4.every(predicate);
      const every5: boolean = project5.every(predicate);
      const every6: boolean = project6.every(predicate);

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
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);
      const key3: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);

      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2],
        [key3, value3]
      ];

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>(kv)
      );

      const predicate: BinaryPredicate<MockValueObject<number>, MockValueObject<number>> = (value: MockValueObject<number>) => {
        return value.get() % 2 === 0;
      };

      const some: boolean = project.some(predicate);

      expect(some).toBe(true);
    });

    it('returns false if none of the values are true', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);
      const key3: MockValueObject<number> = new MockValueObject<number>(3);
      const key4: MockValueObject<number> = new MockValueObject<number>(4);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);
      const value4: MockValueObject<number> = new MockValueObject<number>(8);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );

      const predicate: BinaryPredicate<MockValueObject<number>, MockValueObject<number>> = (value: MockValueObject<number>) => {
        return value.get() % 2 === 1;
      };

      const some: boolean = project.some(predicate);

      expect(some).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const key: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key, value]])
      );

      expect(project.equals(project)).toBe(true);
    });

    it('returns false if the size is different', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(project1.equals(project2)).toBe(false);
    });

    it('returns false when the different class instance given', () => {
      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>()
      );

      expect(project.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns false if the values are different', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value1]
        ])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(project1.equals(project2)).toBe(false);
    });

    it('returns false if the keys are different', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);
      const key3: MockValueObject<number> = new MockValueObject<number>(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key3, value2]
        ])
      );

      expect(project1.equals(project2)).toBe(false);
    });

    it('returns true even if the order is different', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key2, value2],
          [key1, value1]
        ])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(project1.equals(project2)).toBe(true);
    });

    it('returns true if the same and the order is the same', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(project1.equals(project2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns key-value concatenated string', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      expect(project.toString()).toBe('{1: 2}, {3: 4}');
    });
  });

  describe('toMap', () => {
    it('returns its retaining shallow-copied map', () => {
      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const kv: Array<[MockValueObject<number>, MockValueObject<number>]> = [
        [key1, value1],
        [key2, value2]
      ];

      const project: MockProject<MockValueObject<number>, MockValueObject<number>> = new MockProject<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>(kv)
      );
      const map: Map<MockValueObject<number>, MockValueObject<number>> = project.toMap();
      let i: number = 0;

      expect(project.size()).toBe(map.size);
      project.forEach((value: MockValueObject<number>, key: MockValueObject<number>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [k, v]: [MockValueObject<number>, MockValueObject<number>] = kv[i]!;

        expect(key).toBe(k);
        expect(value).toBe(v);
        i++;
      });
    });
  });

  describe('keys', () => {
    it('returns its retaining keys', () => {
      const key1: MockValueObject<string> = new MockValueObject<string>('a');
      const key2: MockValueObject<string> = new MockValueObject<string>('d');
      const keys: Array<MockValueObject<string>> = [key1, key2];

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MockProject<MockValueObject<string>, MockValueObject<number>> = new MockProject<MockValueObject<string>, MockValueObject<number>>(
        new Map<MockValueObject<string>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const key of project.keys()) {
        expect(key).toBe(keys[i]);
        i++;
      }
    });
  });

  describe('values', () => {
    it('returns its retaining values', () => {
      const key1: MockValueObject<string> = new MockValueObject<string>('a');
      const key2: MockValueObject<string> = new MockValueObject<string>('d');

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const values: Array<MockValueObject<number>> = [value1, value2];

      const project: MockProject<MockValueObject<string>, MockValueObject<number>> = new MockProject<MockValueObject<string>, MockValueObject<number>>(
        new Map<MockValueObject<string>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );

      let i: number = 0;

      for (const key of project.values()) {
        expect(key).toBe(values[i]);
        i++;
      }
    });
  });

  describe('find', () => {
    it('returns the first found value', () => {
      const key1: MockValueObject<string> = new MockValueObject<string>('a');
      const key2: MockValueObject<string> = new MockValueObject<string>('d');
      const key3: MockValueObject<string> = new MockValueObject<string>('g');
      const key4: MockValueObject<string> = new MockValueObject<string>('k');

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const project: MockProject<MockValueObject<string>, MockValueObject<number>> = new MockProject<MockValueObject<string>, MockValueObject<number>>(new Map<MockValueObject<string>, MockValueObject<number>>([
        [key1, value1],
        [key2, value2],
        [key3, value3],
        [key4, value4]
      ]));

      const found1: Nullable<MockValueObject<number>> = project.find((v: MockValueObject<number>) => {
        return v.get() === 1;
      });
      const found2: Nullable<MockValueObject<number>> = project.find((v: MockValueObject<number>) => {
        return v.get() === 2;
      });
      const found3: Nullable<MockValueObject<number>> = project.find((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const found4: Nullable<MockValueObject<number>> = project.find((v: MockValueObject<number>) => {
        return v.get() > 1000;
      });
      const found5: Nullable<MockValueObject<number>> = project.find((_v: MockValueObject<number>, k: MockValueObject<string>) => {
        return k.get().length === 1;
      });

      expect(found1).toBe(value1);
      expect(found2).toBe(value2);
      expect(found3).toBe(value2);
      expect(found4).toBeNull();
      expect(found5).toBe(value1);
    });
  });
});
