import { MockValueObject } from '@jamashita/anden/object';
import { ImmutableDictionary } from '../ImmutableDictionary.js';

describe('ImmutableDictionary', () => {
  describe('await', () => {
    it('returns resolved ImmutableDictionary', async () => {
      await expect(ImmutableDictionary.await(ImmutableDictionary.empty<unknown, Promise<unknown>>())).resolves.toBeInstanceOf(ImmutableDictionary);
    });
  });

  describe('empty', () => {
    it('returns singleton singleton instance', () => {
      expect(ImmutableDictionary.empty()).toBe(ImmutableDictionary.empty());
    });

    it('always returns 0-size map', () => {
      const dictionary: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.empty();

      expect(dictionary.size()).toBe(0);
    });
  });

  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const dictionary: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(3), new MockValueObject(4)]
        ])
      );
      const copied: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.of(dictionary);

      expect(dictionary.size()).toBe(copied.size());
      dictionary.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(copied.has(k)).toBe(true);
        expect(copied.contains(v)).toBe(true);
      });

      dictionary.set(new MockValueObject(5), new MockValueObject(6));

      expect(dictionary.size()).toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns ImmutableDictionary.empty() when the size is 0', () => {
      const dictionary: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map()
      );

      expect(dictionary.isEmpty()).toBe(true);
      expect(dictionary).toBe(ImmutableDictionary.empty());
    });

    it('returns instance', () => {
      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(5), new MockValueObject(6)]
        ])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
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
    it('returns ImmutableDictionary.empty() when there are no key-value pairs', () => {
      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([])
      );

      expect(dictionary1.duplicate()).toBe(ImmutableDictionary.empty());
    });

    it('returns shallow-copied instance', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);
      const key3: MockValueObject<number> = new MockValueObject(5);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.duplicate();

      expect(dictionary1.size()).toBe(dictionary2.size());
      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary2).not.toBe(dictionary2.set(key3, value3));
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

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered1: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((v: MockValueObject<string>) => {
        return v.get().length % 2 === 0;
      });
      const filtered2: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((_v: MockValueObject<string>, k: MockValueObject<number>) => {
        return k.get() % 2 === 1;
      });
      const filtered3: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((v: MockValueObject<string>) => {
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

    it('return ImmutableDictionary.empty() when matches nothing', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);
      const key4: MockValueObject<number> = new MockValueObject(4);

      const value1: MockValueObject<string> = new MockValueObject('a');
      const value2: MockValueObject<string> = new MockValueObject('aa');
      const value3: MockValueObject<string> = new MockValueObject('aaa');
      const value4: MockValueObject<string> = new MockValueObject('aaaa');

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.filter((v: MockValueObject<string>) => {
        return v.get() === 'aaaaa';
      });

      expect(filtered.size()).toBe(0);
      expect(filtered).toBe(ImmutableDictionary.empty());
    });
  });

  describe('hashCode', () => {
    it('returns different hash when retaining value is added', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value1: MockValueObject<string> = new MockValueObject('a');
      const value2: MockValueObject<string> = new MockValueObject('aa');

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, value1]
        ])
      );
      const hashCode1: string = dictionary1.hashCode();
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<string>> = dictionary1.set(key2, value2);
      const hashCode2: string = dictionary2.hashCode();

      expect(hashCode1).not.toBe(hashCode2);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key, value]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
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

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.map((v: MockValueObject<number>) => {
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
    it('can remove retaining value if it contains', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key, value]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.remove(key);

      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key1, value]])
      );
      const beforeLength: number = dictionary.size();

      expect(dictionary.remove(key2)).toBe(dictionary);
      expect(dictionary.size()).toBe(beforeLength);
    });

    it('does nothing when the dictionary is empty', () => {
      const dictionary: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.empty();

      expect(dictionary.remove(new MockValueObject(1))).toBe(dictionary);
    });

    it('returns the removed Dictionary', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key1, value]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.remove(key2);

      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.size()).toBe(0);
    });

    it('returns ImmutableDictionary.empty() when the size will be 0', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key, value]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.remove(key);

      expect(dictionary2).toBe(ImmutableDictionary.empty());
    });
  });

  describe('set', () => {
    it('can extend immutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.empty();

      expect(dictionary1.size()).toBe(0);

      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key1, value1);

      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary1.size()).toBe(0);
      expect(dictionary2.size()).toBe(1);

      const dictionary3: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary2.set(key2, value2);

      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary2).not.toBe(dictionary3);
      expect(dictionary3).not.toBe(dictionary1);
      expect(dictionary1.size()).toBe(0);
      expect(dictionary2.size()).toBe(1);
      expect(dictionary3.size()).toBe(2);
    });

    it('overwrites when the keys are already contained', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key1, value1]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key1, value2);

      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.size()).toBe(1);
      expect(dictionary2.get(key1)).toBe(value2);
    });

    it('stores key-value when the keys are not contained yet', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const dictionary1: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = ImmutableDictionary.ofMap(
        new Map([[key1, value1]])
      );
      const dictionary2: ImmutableDictionary<MockValueObject<number>, MockValueObject<number>> = dictionary1.set(key2, value2);

      expect(dictionary1).not.toBe(dictionary2);
      expect(dictionary1.size()).toBe(1);
      expect(dictionary2.size()).toBe(2);
      expect(dictionary2.get(key1)).toBe(value1);
      expect(dictionary2.get(key2)).toBe(value2);
    });
  });
});
