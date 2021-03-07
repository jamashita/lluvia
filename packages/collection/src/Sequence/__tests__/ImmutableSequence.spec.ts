import { MockValueObject } from '@jamashita/anden-object';
import { Nullable } from '@jamashita/anden-type';
import { ImmutableSequence } from '../ImmutableSequence';

describe('ImmutableSequence', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      expect.assertions(4);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(1),
        new MockValueObject<number>(2)
      ]);
      const copied: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.of<MockValueObject<number>>(sequence);

      expect(sequence.size()).toBe(copied.size());
      sequence.forEach((v: MockValueObject<number>, k: number) => {
        expect(v).toBe(copied.get(k));
      });

      sequence.add(new MockValueObject<number>(3));

      expect(sequence.size()).toBe(copied.size());
    });
  });

  describe('ofArray', () => {
    it('returns ImmutableSequence.empty() when the size is 0', () => {
      expect.assertions(2);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([]);

      expect(sequence.isEmpty()).toBe(true);
      expect(sequence).toBe(ImmutableSequence.empty<MockValueObject<number>>());
    });

    it('returns instance', () => {
      expect.assertions(2);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(1),
        new MockValueObject<number>(3)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(2),
        new MockValueObject<number>(4),
        new MockValueObject<number>(5)
      ]);

      expect(sequence1.size()).toBe(2);
      expect(sequence2.size()).toBe(3);
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(ImmutableSequence.empty<MockValueObject<number>>()).toBe(ImmutableSequence.empty<MockValueObject<string>>());
    });

    it('always returns 0-size array', () => {
      expect.assertions(1);

      expect(ImmutableSequence.empty<MockValueObject<number>>().isEmpty()).toBe(true);
    });
  });

  describe('add', () => {
    it('can extend immutably', () => {
      expect.assertions(13);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.empty<MockValueObject<number>>();

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

  describe('set', () => {
    it('can be set the value into first position', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(0, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value4);
      expect(sequence2.get(1)).toBe(value2);
      expect(sequence2.get(2)).toBe(value3);
    });

    it('can be set the value into middle position', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(1, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value4);
      expect(sequence2.get(2)).toBe(value3);
    });

    it('can be set the value into last position', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(2, value4);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(3);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value2);
      expect(sequence2.get(2)).toBe(value4);
    });

    it('returns itself when given key is less than 0', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(-1, value4);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is greater than sequence length', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(sequence1.size(), value4);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when given key is not integer', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(4);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.set(2.2, value4);

      expect(sequence1).toBe(sequence2);
    });
  });

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      expect.assertions(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);

      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(0);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value2);
      expect(sequence2.get(1)).toBe(value3);
    });

    it('removes middle value', () => {
      expect.assertions(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(1);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value3);
    });

    it('removes last value', () => {
      expect.assertions(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(2);

      expect(sequence1).not.toBe(sequence2);
      expect(sequence1.size()).toBe(3);
      expect(sequence2.size()).toBe(2);
      expect(sequence2.get(0)).toBe(value1);
      expect(sequence2.get(1)).toBe(value2);
    });

    it('returns itself when give key is greater than sequence length', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(3);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when give key is less than 0', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(-1);

      expect(sequence1).toBe(sequence2);
    });

    it('returns itself when give key is not integer', () => {
      expect.assertions(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.remove(0.8);

      expect(sequence1).toBe(sequence2);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      expect.assertions(2);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(1),
        new MockValueObject<number>(2)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([]);

      expect(sequence1.isEmpty()).toBe(false);
      expect(sequence2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      expect.assertions(5);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(1),
        new MockValueObject<number>(2),
        new MockValueObject<number>(3)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<string>> = sequence1.map<MockValueObject<string>>(
        (value: MockValueObject<number>) => {
          const num: number = value.get();

          return new MockValueObject<string>(`${num ** 2}`);
        }
      );

      expect(sequence1.size()).toBe(sequence2.size());
      expect(sequence1).not.toBe(sequence2);
      sequence2.forEach((v: MockValueObject<string>, k: number) => {
        const value: Nullable<MockValueObject<number>> = sequence1.get(k);

        if (value === null) {
          fail();
          return;
        }

        expect(v.get()).toBe(`${value.get() ** 2}`);
      });
    });
  });

  describe('filter', () => {
    it('can remove match values', () => {
      expect.assertions(6);

      const value1: MockValueObject<number> = new MockValueObject<number>(1);
      const value2: MockValueObject<number> = new MockValueObject<number>(2);
      const value3: MockValueObject<number> = new MockValueObject<number>(3);
      const value4: MockValueObject<number> = new MockValueObject<number>(2);
      const value5: MockValueObject<number> = new MockValueObject<number>(5);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        value1,
        value2,
        value3,
        value4
      ]);

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

  describe('sort', () => {
    it('when the size is 0, do nothing', () => {
      expect.assertions(2);

      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.empty<MockValueObject<number>>();
      const sorted: ImmutableSequence<MockValueObject<number>> = sequence.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(0);
      expect(sequence).toBe(sorted);
    });

    it('when the size is 1, just copy a sequence shallowly', () => {
      expect.assertions(3);

      const arr: Array<MockValueObject<number>> = [
        new MockValueObject<number>(2)
      ];
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>(arr);
      const sorted: ImmutableSequence<MockValueObject<number>> = sequence.sort(() => {
        return 1;
      });

      expect(sorted.size()).toBe(1);
      expect(sequence).not.toBe(sorted);
      expect(sequence.get(0)).toBe(sorted.get(0));
    });

    it('returns like an array', () => {
      expect.assertions(10);

      const arr: Array<MockValueObject<number>> = [
        new MockValueObject<number>(4),
        new MockValueObject<number>(2),
        new MockValueObject<number>(3),
        new MockValueObject<number>(1)
      ];
      const sequence: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>(arr);
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

  describe('duplicate', () => {
    it('returns ImmutableSequence.empty() when this is ImmutableSequence.empty()', () => {
      expect.assertions(1);

      expect(ImmutableSequence.empty<MockValueObject<number>>().duplicate()).toBe(ImmutableSequence.empty<MockValueObject<number>>());
    });

    it('returns shallow-copied instance', () => {
      expect.assertions(6);

      const sequence1: ImmutableSequence<MockValueObject<number>> = ImmutableSequence.ofArray<MockValueObject<number>>([
        new MockValueObject<number>(1),
        new MockValueObject<number>(2),
        new MockValueObject<number>(3),
        new MockValueObject<number>(2)
      ]);
      const sequence2: ImmutableSequence<MockValueObject<number>> = sequence1.duplicate();

      expect(sequence1.size()).toBe(sequence2.size());
      expect(sequence1).not.toBe(sequence2);
      sequence1.forEach((v: MockValueObject<number>, k: number) => {
        expect(v).toBe(sequence2.get(k));
      });
    });
  });
});
