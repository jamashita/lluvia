import { MockValueObject } from '@jamashita/anden/object';
import type { Nullable } from '@jamashita/anden/type';
import { ImmutableSequence } from '../ImmutableSequence.js';

describe('ImmutableSequence', () => {
  describe('await', () => {
    it('returns resolved ImmutableSequence', async () => {
      await expect(ImmutableSequence.await(ImmutableSequence.empty<Promise<unknown>>())).resolves.toBeInstanceOf(ImmutableSequence);
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect(ImmutableSequence.empty()).toBe(ImmutableSequence.empty());
    });

    it('always returns 0-size array', () => {
      expect(ImmutableSequence.empty().isEmpty()).toBe(true);
    });
  });

  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([new MockValueObject(1), new MockValueObject(2)]);
      const copied: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.of(sequence);

      expect(sequence.size()).toBe(copied.size());
      sequence.forEach((v: MockValueObject<number>, k: number) => {
        expect(v).toBe(copied.get(k));
      });

      sequence.add(new MockValueObject(3));

      expect(sequence.size()).toBe(copied.size());
    });
  });

  describe('ofArray', () => {
    it('returns ImmutableSequence.empty() when the size is 0', () => {
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([]);

      expect(sequence.isEmpty()).toBe(true);
      expect(sequence).toBe(ImmutableSequence.empty());
    });

    it('returns instance', () => {
      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([new MockValueObject(1), new MockValueObject(3)]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([
        new MockValueObject(2),
        new MockValueObject(4),
        new MockValueObject(5)
      ]);

      expect(sequence1.size()).toBe(2);
      expect(sequence2.size()).toBe(3);
    });
  });

  describe('add', () => {
    it('can extend immutably', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.empty();

      expect(sequence1.size()).toBe(0);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.add(value1);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(0);
      expect(sequence2.size()).toBe(1);
      expect(sequence2.get(0)).toBe(value1);

      const sequence3: ImmutableSequence<MockValueObject<number>> = sequence2.add(value2);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence2).not.toBe(sequence3);
      expect(sequence3).not.toBe(sequence1);
      expect(sequence1.size()).toBe(0);
      expect(sequence2.size()).toBe(1);
      expect(sequence3.size()).toBe(2);
      expect(sequence3.get(0)).toBe(value1);
      expect(sequence3.get(1)).toBe(value2);
    });
  });

  describe('duplicate', () => {
    it('returns ImmutableSequence.empty() when this is ImmutableSequence.empty()', () => {
      expect(ImmutableSequence.empty().duplicate()).toBe(ImmutableSequence.empty());
    });

    it('returns shallow-copied instance', () => {
      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3),
        new MockValueObject(2)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.duplicate();

      expect(sequence1.size()).toBe(sequence2.size());
      expect(sequence1).not.toBe(sequence2);
      sequence1.forEach((v: MockValueObject<number>, k: number) => {
        expect(v).toBe(sequence2.get(k));
      });
    });
  });

  describe('filter', () => {
    it('returns ImmutableSequence.EMPTY when no match', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(2);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3, value4]);

      const filtered: ImmutableSequence<MockValueObject<number>> = sequence.filter((v: MockValueObject<number>) => {
        return v.get() > 100;
      });

      expect(filtered.size()).toBe(0);
      expect(filtered).toBe(ImmutableSequence.empty<number>());
    });

    it('can remove match values', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(2);
      const value5: MockValueObject<number> = new MockValueObject(5);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3, value4]);

      const filtered1: ImmutableSequence<MockValueObject<number>> = sequence.filter((v: MockValueObject<number>) => {
        return v.get() % 2 === 0;
      });
      const filtered2: ImmutableSequence<MockValueObject<number>> = sequence.filter((v: MockValueObject<number>) => {
        return v === value4;
      });
      const filtered3: ImmutableSequence<MockValueObject<number>> = sequence.filter((v: MockValueObject<number>) => {
        return v === value5;
      });

      expect(filtered1.size()).toBe(2);
      expect(filtered1.get(0)).toBe(value2);
      expect(filtered1.get(1)).toBe(value4);
      expect(filtered2.size()).toBe(1);
      expect(filtered2.get(0)).toBe(value4);
      expect(filtered3.size()).toBe(0);
    });
  });

  describe('hashCode', () => {
    it('returns different hash when retaining value is added', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1]);
      const hashCode1: string = sequence1.hashCode();
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.add(value2);
      const hashCode2: string = sequence2.hashCode();

      expect(hashCode1).not.toBe(hashCode2);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([new MockValueObject(1), new MockValueObject(2)]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([]);

      expect(sequence1.isEmpty()).toBe(false);
      expect(sequence2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([
        new MockValueObject(1),
        new MockValueObject(2),
        new MockValueObject(3)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<string>> = sequence1.map((value: MockValueObject<number>) => {
        const num: number = value.get();

        return new MockValueObject<string>(`${num ** 2}`);
      });

      expect(sequence1.size()).toBe(sequence2.size());
      expect(sequence1).not.toBe(sequence2);
      sequence2.forEach((v: MockValueObject<string>, k: number) => {
        const value: Nullable<MockValueObject<number>> = sequence1.get(k);

        if (value === null) {
          throw new Error();
        }

        expect(v.get()).toBe(`${value.get() ** 2}`);
      });
    });
  });

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(0);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value2);
      expect(sequence2.get(1)).toBe(value3);
    });

    it('removes middle value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(1);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value3);
    });

    it('removes last value', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(2);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value2);
    });

    it('returns itself when given key is greater than sequence length', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(3);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is less than 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(-1);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is not integer', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(0.8);

      expect(sequence1).toBe(sequence2);
    });
  });

  describe('set', () => {
    it('can be set the value into first position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(0, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value4);
      expect(sequence2.get(1)).toBe(value2);
      expect(sequence2.get(2)).toBe(value3);
    });

    it('can be set the value into middle position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(1, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value4);
      expect(sequence2.get(2)).toBe(value3);
    });

    it('can be set the value into last position', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(2, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value2);
      expect(sequence2.get(2)).toBe(value4);
    });

    it('returns itself when given key is less than 0', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(-1, value4);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is greater than sequence length', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(sequence1.size(), value4);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is not integer', () => {
      const value1: MockValueObject<number> = new MockValueObject(1);
      const value2: MockValueObject<number> = new MockValueObject(2);
      const value3: MockValueObject<number> = new MockValueObject(3);
      const value4: MockValueObject<number> = new MockValueObject(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray([value1, value2, value3]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(2.2, value4);

      expect(sequence1).toBe(sequence2);
    });
  });

  describe('sort', () => {
    it('when the size is 0, do nothing', () => {
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.empty();
      const sorted: ImmutableSequence<MockValueObject<number>> = sequence.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(0);
      expect(sequence).toBe(sorted);
    });

    it('when the size is 1, just copy a sequence shallowly', () => {
      const arr: Array<MockValueObject<number>> = [new MockValueObject(2)];
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray(arr);
      const sorted: ImmutableSequence<MockValueObject<number>> = sequence.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(1);
      expect(sequence).not.toBe(sorted);
      expect(sequence.get(0)).toBe(sorted.get(0));
    });

    it('returns like an array', () => {
      const arr: Array<MockValueObject<number>> = [new MockValueObject(4), new MockValueObject(2), new MockValueObject(3), new MockValueObject(1)];
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray(arr);
      const sorted: ImmutableSequence<MockValueObject<number>> = sequence.sort((m1: MockValueObject<number>, m2: MockValueObject<number>) => {
        return m1.get() - m2.get();
      });

      expect(sorted.size()).toBe(sequence.size());
      expect(sequence).not.toBe(sorted);
      expect(sorted.get(0)).toBe(sequence.get(3));
      expect(sorted.get(0)?.get()).toBe(1);
      expect(sorted.get(1)).toBe(sequence.get(1));
      expect(sorted.get(1)?.get()).toBe(2);
      expect(sorted.get(2)).toBe(sequence.get(2));
      expect(sorted.get(2)?.get()).toBe(3);
      expect(sorted.get(3)).toBe(sequence.get(0));
      expect(sorted.get(3)?.get()).toBe(4);
    });
  });
});
