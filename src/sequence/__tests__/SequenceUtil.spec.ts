import { MockValueObject } from '@jamashita/anden/object';
import { ImmutableSequence } from '../ImmutableSequence.js';
import type { Sequence } from '../Sequence.js';
import { SequenceUtil } from '../SequenceUtil.js';

describe('SequenceUtil', () => {
  describe('wait', () => {
    it('returns empty array when given sequence is empty', async () => {
      const seq: Sequence<Promise<MockValueObject<number>>> = ImmutableSequence.empty();

      await SequenceUtil.wait(seq, (values: Array<MockValueObject<number>>) => {
        expect(values).toHaveLength(0);

        return ImmutableSequence.ofArray(values);
      });
    });

    it('returns resolved values, item order is retained', async () => {
      const mock1: MockValueObject<number> = new MockValueObject(2);
      const mock2: MockValueObject<number> = new MockValueObject(1);
      const mock3: MockValueObject<number> = new MockValueObject(3);
      const mock4: MockValueObject<number> = new MockValueObject(4);
      const seq: Sequence<Promise<MockValueObject<number>>> = ImmutableSequence.ofArray([
        Promise.resolve(mock1),
        Promise.resolve(mock2),
        Promise.resolve(mock3),
        Promise.resolve(mock4)
      ]);

      await SequenceUtil.wait(seq, (values: Array<MockValueObject<number>>) => {
        expect(values).toHaveLength(seq.size());
        expect(values[0]).toBe(mock1);
        expect(values[1]).toBe(mock2);
        expect(values[2]).toBe(mock3);
        expect(values[3]).toBe(mock4);

        return ImmutableSequence.ofArray(values);
      });
    });

    it('rejects the sequence when at least one of them has error', async () => {
      const err: Error = new Error();
      const seq: Sequence<Promise<MockValueObject<number>>> = ImmutableSequence.ofArray([
        Promise.resolve(new MockValueObject(2)),
        Promise.resolve(new MockValueObject(1)),
        Promise.reject(err),
        Promise.resolve(new MockValueObject(4))
      ]);

      await expect(
        SequenceUtil.wait(seq, (values: Array<MockValueObject<number>>) => {
          return ImmutableSequence.ofArray(values);
        })
      ).rejects.toThrow(err);
    });
  });
});
