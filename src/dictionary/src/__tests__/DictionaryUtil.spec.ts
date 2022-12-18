import { MockValueObject } from '@jamashita/anden-object';
import { Dictionary } from '../Dictionary';
import { DictionaryUtil } from '../DictionaryUtil';
import { ImmutableDictionary } from '../ImmutableDictionary';

describe('DictionaryUtil', () => {
  describe('await', () => {
    it('returns empty map when given dictionary is empty', async () => {
      const dic: Dictionary<MockValueObject<string>, Promise<MockValueObject<number>>> = ImmutableDictionary.empty();

      await DictionaryUtil.await(dic, (values: Map<MockValueObject<string>, MockValueObject<number>>) => {
        expect(values.size).toBe(0);

        return ImmutableDictionary.ofMap(values);
      });
    });

    it('returns resolved values, kv mapping is retaind', async () => {
      const key1: MockValueObject<string> = new MockValueObject('c');
      const key2: MockValueObject<string> = new MockValueObject('v');
      const key3: MockValueObject<string> = new MockValueObject('j');
      const key4: MockValueObject<string> = new MockValueObject('p');
      const mock1: MockValueObject<number> = new MockValueObject(2);
      const mock2: MockValueObject<number> = new MockValueObject(1);
      const mock3: MockValueObject<number> = new MockValueObject(3);
      const mock4: MockValueObject<number> = new MockValueObject(4);
      const dic: Dictionary<MockValueObject<string>, Promise<MockValueObject<number>>> = ImmutableDictionary.ofMap(
        new Map([
          [key1, Promise.resolve(mock1)],
          [key2, Promise.resolve(mock2)],
          [key3, Promise.resolve(mock3)],
          [key4, Promise.resolve(mock4)]
        ])
      );

      await DictionaryUtil.await(dic, (values: Map<MockValueObject<string>, MockValueObject<number>>) => {
        expect(values.size).toBe(dic.size());
        expect(values.get(key1)).toBe(mock1);
        expect(values.get(key2)).toBe(mock2);
        expect(values.get(key3)).toBe(mock3);
        expect(values.get(key4)).toBe(mock4);

        return ImmutableDictionary.ofMap(values);
      });
    });

    it('rejects the dictionary when at least one of them has error', async () => {
      const err: Error = new Error();
      const dic: Dictionary<MockValueObject<string>, Promise<MockValueObject<number>>> = ImmutableDictionary.ofMap(
        new Map([
          [new MockValueObject('c'), Promise.resolve(new MockValueObject(2))],
          [new MockValueObject('v'), Promise.resolve(new MockValueObject(1))],
          [new MockValueObject('j'), Promise.reject(err)],
          [new MockValueObject('p'), Promise.resolve(new MockValueObject(4))]
        ])
      );

      await expect(DictionaryUtil.await(dic, (values: Map<MockValueObject<string>, MockValueObject<number>>) => {
        return ImmutableDictionary.ofMap(values);
      })).rejects.toThrow(err);
    });
  });
});
