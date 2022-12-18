import { MockValueObject } from '@jamashita/anden/object';
import { MutableDictionary } from '../MutableDictionary.js';

describe('MutableDictionary', () => {
  describe('await', () => {
    it('returns resolved MutableDictionary', async () => {
      await expect(MutableDictionary.await(MutableDictionary.empty<unknown, Promise<unknown>>())).resolves.toBeInstanceOf(MutableDictionary);
    });
  });

  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect(MutableDictionary.empty()).not.toBe(MutableDictionary.empty());
    });

    it('always returns 0-size set', () => {
      expect(MutableDictionary.empty().isEmpty()).toBe(true);
    });
  });

  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const dictionary: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(3), new MockValueObject(4)]
        ])
      );
      const copied: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.of(dictionary);

      expect(dictionary.size()).toBe(copied.size());
      expect(dictionary.get(new MockValueObject(1))).not.toBeNull();
      expect(dictionary.get(new MockValueObject(1))).toBe(copied.get(new MockValueObject(1)));
      expect(dictionary.get(new MockValueObject(3))).not.toBeNull();
      expect(dictionary.get(new MockValueObject(3))).toBe(copied.get(new MockValueObject(3)));

      dictionary.set(new MockValueObject(5), new MockValueObject(6));

      expect(dictionary.size()).not.toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns MutableAddress.empty() when set size is 0', () => {
      const dictionary: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([])
      );

      expect(dictionary.isEmpty()).toBe(true);
    });

    it('returns instance', () => {
      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(5), new MockValueObject(6)]
        ])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([
          [new MockValueObject(3), new MockValueObject(4)],
          [new MockValueObject(7), new MockValueObject(8)],
          [new MockValueObject(9), new MockValueObject(10)]
        ])
      );

      expect(dictionary1.size()).toBe(2);
      expect(dictionary2.size()).toBe(3);
    });
  });

  describe('duplicate', () => {
    it('returns shallow-copied instance', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);
      const key3: MockValueObject<number> = new MockValueObject(5);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.duplicate();

      expect(dictionary1.size()).toBe(dictionary2.size());
      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary2).toBe(dictionary2.set(key3, value3));
      dictionary1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(dictionary2.has(k)).toBe(true);
        expect(dictionary2.contains(v)).toBe(true);
      });
    });
  });

  describe('filter', () => {
    it('can remove match values', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);
      const key4: MockValueObject<number> = new MockValueObject(4);

      const value1: MockValueObject<string> = new MockValueObject('a');
      const value2: MockValueObject<string> = new MockValueObject('aa');
      const value3: MockValueObject<string> = new MockValueObject('aaa');
      const value4: MockValueObject<string> = new MockValueObject('aaaa');
      const value5: MockValueObject<string> = new MockValueObject('aaaaa');

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<string>> = MutableDictionary.ofMap(
        new Map<MockValueObject<number>, MockValueObject<string>>([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered1: MutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((v: MockValueObject<string>) => {
        return v.get().length % 2 === 0;
      });
      const filtered2: MutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((_v: MockValueObject<string>, k: MockValueObject<number>) => {
        return k.get() % 2 === 1;
      });
      const filtered3: MutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((v: MockValueObject<string>) => {
        return v === value5;
      });

      expect(filtered1.size()).toBe(2);
      expect(filtered1.get(key2)).toBe(value2);
      expect(filtered1.get(key4)).toBe(value4);
      expect(filtered2.size()).toBe(2);
      expect(filtered2.get(key1)).toBe(value1);
      expect(filtered2.get(key3)).toBe(value3);
      expect(filtered3.size()).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key1, value]])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([])
      );

      expect(dictionary1.isEmpty()).toBe(false);
      expect(dictionary2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.map((v: MockValueObject<number>): MockValueObject<number> => {
        return new MockValueObject(v.get() + 10);
      });

      expect(dictionary1.size()).toBe(dictionary2.size());
      expect(dictionary1).not.toBe(dictionary2);
      dictionary1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(dictionary2.get(k)?.get()).toBe(v.get() + 10);
      });
    });
  });

  describe('remove', () => {
    it('can remove retaining key if it contains', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key, value]])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.remove(key);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key1, value]])
      );
      const beforeLength: number = dictionary.size();

      expect(dictionary.remove(key2)).toBe(dictionary);
      expect(dictionary.size()).toBe(beforeLength);
    });

    it('does nothing when the dictionary is empty', () => {
      const dictionary: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.empty();

      expect(dictionary.remove(new MockValueObject(1))).toBe(dictionary);
    });

    it('returns the removed Dictionary', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key3: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key1, value]])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.remove(key3);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary1.size()).toBe(0);
    });
  });

  describe('set', () => {
    it('can extend mutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.empty();

      expect(dictionary1.size()).toBe(0);

      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key1, value1);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);

      const dictionary3: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary2.set(key2, value2);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary2).toBe(dictionary3);
      expect(dictionary3).toBe(dictionary1);
      expect(dictionary1.size()).toBe(2);
    });

    it('overwrites when the keys are already contained', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key1, value1]])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key1, value2);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.get(key1)).toBe(value2);
    });

    it('also can overwrite when the other same key value objects are already contained', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const dictionary1: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = MutableDictionary.ofMap(
        new Map([[key1, value1]])
      );
      const dictionary2: MutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key2, value2);

      expect(dictionary1).toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.get(key1)).toBe(value2);
      expect(dictionary2.get(key2)).toBe(value2);
    });
  });
});
