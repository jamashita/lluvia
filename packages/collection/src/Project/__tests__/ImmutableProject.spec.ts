import { MockValueObject } from '@jamashita/anden-object';
import { ImmutableProject } from '../ImmutableProject';

describe('ImmutableProject', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      expect.assertions(6);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [new MockValueObject<number>(1), new MockValueObject<number>(2)],
          [new MockValueObject<number>(3), new MockValueObject<number>(4)]
        ])
      );
      const copied: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.of<MockValueObject<number>, MockValueObject<number>>(project);

      expect(project.size()).toBe(copied.size());
      project.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(copied.has(k)).toBe(true);
        expect(copied.contains(v)).toBe(true);
      });

      project.set(new MockValueObject<number>(5), new MockValueObject<number>(6));

      expect(project.size()).toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns ImmutableProject.empty() when the size is 0', () => {
      expect.assertions(2);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>()
      );

      expect(project.isEmpty()).toBe(true);
      expect(project).toBe(ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>());
    });

    it('returns instance', () => {
      expect.assertions(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [new MockValueObject<number>(1), new MockValueObject<number>(2)],
          [new MockValueObject<number>(5), new MockValueObject<number>(6)]
        ])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [new MockValueObject<number>(3), new MockValueObject<number>(4)],
          [new MockValueObject<number>(7), new MockValueObject<number>(8)],
          [new MockValueObject<number>(9), new MockValueObject<number>(10)]
        ])
      );

      expect(project1.size()).toBe(2);
      expect(project2.size()).toBe(3);
    });
  });

  describe('empty', () => {
    it('returns singleton singleton instance', () => {
      expect.assertions(1);

      expect(ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>()).toBe(ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>());
    });

    it('always returns 0-size map', () => {
      expect.assertions(1);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>();

      expect(project.size()).toBe(0);
    });
  });

  describe('set', () => {
    it('can extend immutably', () => {
      expect.assertions(10);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>();

      expect(project1.size()).toBe(0);

      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value1);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(0);
      expect(project2.size()).toBe(1);

      const project3: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project2.set(key2, value2);

      expect(project1).not.toBe(project2);
      expect(project2).not.toBe(project3);
      expect(project3).not.toBe(project1);
      expect(project1.size()).toBe(0);
      expect(project2.size()).toBe(1);
      expect(project3.size()).toBe(2);
    });

    it('overwrites when the keys are already contained', () => {
      expect.assertions(4);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value2);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(1);
      expect(project2.get(key1)).toBe(value2);
    });

    it('stores key-value when the keys are not contained yet', () => {
      expect.assertions(5);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key2, value2);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(2);
      expect(project2.get(key1)).toBe(value1);
      expect(project2.get(key2)).toBe(value2);
    });
  });

  describe('remove', () => {
    it('can remove retaining value if it contains', () => {
      expect.assertions(2);

      const key: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      expect.assertions(2);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value]])
      );
      const beforeLength: number = project.size();

      expect(project.remove(key2)).toBe(project);
      expect(project.size()).toBe(beforeLength);
    });

    it('does nothing when the project is empty', () => {
      expect.assertions(1);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>();

      expect(project.remove(new MockValueObject<number>(1))).toBe(project);
    });

    it('returns the removed Project', () => {
      expect.assertions(3);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key2);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(0);
    });

    it('returns ImmutableProject.empty() when the size will be 0', () => {
      expect.assertions(1);

      const key: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project2).toBe(ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>());
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      expect.assertions(2);

      const key: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([])
      );

      expect(project1.isEmpty()).toBe(false);
      expect(project2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      expect.assertions(4);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.map<MockValueObject<number>>((v: MockValueObject<number>) => {
        return new MockValueObject(v.get() + 10);
      });

      expect(project1.size()).toBe(project2.size());
      expect(project1).not.toBe(project2);
      project1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(project2.get(k)?.get()).toBe(v.get() + 10);
      });
    });
  });

  describe('duplicate', () => {
    it('returns ImmutableProject.empty() when there are no key-value pairs', () => {
      expect.assertions(1);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([])
      );

      expect(project1.duplicate()).toBe(ImmutableProject.empty<MockValueObject<number>, MockValueObject<number>>());
    });

    it('returns shallow-copied instance', () => {
      expect.assertions(7);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);
      const key3: MockValueObject<number> = new MockValueObject<number>(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.duplicate();

      expect(project1.size()).toBe(project2.size());
      expect(project1).not.toBe(project2);
      expect(project2).not.toBe(project2.set(key3, value3));
      project1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(project2.has(k)).toBe(true);
        expect(project2.contains(v)).toBe(true);
      });
    });
  });
});
