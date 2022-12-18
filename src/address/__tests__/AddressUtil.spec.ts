import { MockValueObject } from '@jamashita/anden/object';
import { Address } from '../Address.js';
import { AddressUtil } from '../AddressUtil.js';
import { ImmutableAddress } from '../ImmutableAddress.js';

describe('AddressUtil', () => {
  describe('await', () => {
    it('returns empty set when given address is empty', async () => {
      const add: Address<Promise<MockValueObject<number>>> = ImmutableAddress.empty();

      await AddressUtil.await(add, (values: Set<MockValueObject<number>>) => {
        expect(values.size).toBe(0);

        return ImmutableAddress.ofSet(values);
      });
    });

    it('returns resolved values', async () => {
      const mock1: MockValueObject<number> = new MockValueObject(2);
      const mock2: MockValueObject<number> = new MockValueObject(1);
      const mock3: MockValueObject<number> = new MockValueObject(3);
      const mock4: MockValueObject<number> = new MockValueObject(4);
      const add: Address<Promise<MockValueObject<number>>> = ImmutableAddress.ofSet(
        new Set([
          Promise.resolve(mock1),
          Promise.resolve(mock2),
          Promise.resolve(mock3),
          Promise.resolve(mock4)
        ])
      );

      await AddressUtil.await(add, (values: Set<MockValueObject<number>>) => {
        expect(values.size).toBe(add.size());
        expect(values.has(mock1)).toBe(true);
        expect(values.has(mock2)).toBe(true);
        expect(values.has(mock3)).toBe(true);
        expect(values.has(mock4)).toBe(true);

        return ImmutableAddress.ofSet(values);
      });
    });

    it('rejects the address when at least one of them has error', async () => {
      const err: Error = new Error();
      const add: Address<Promise<MockValueObject<number>>> = ImmutableAddress.ofSet(
        new Set([
          Promise.resolve(new MockValueObject(2)),
          Promise.resolve(new MockValueObject(1)),
          Promise.reject(err),
          Promise.resolve(new MockValueObject(4))
        ])
      );

      await expect(AddressUtil.await(add, (values: Set<MockValueObject<number>>) => {
        return ImmutableAddress.ofSet(values);
      })).rejects.toThrow(err);
    });
  });
});
