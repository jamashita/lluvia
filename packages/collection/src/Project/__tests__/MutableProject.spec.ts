import { MockValueObject } from '@jamashita/anden-object';
import { MutableProject } from '../MutableProject';

describe('MutableProject', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      expect.assertions(6);

      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [new MockValueObject<number>(1), new MockValueObject<number>(2)],
          [new MockValueObject<number>(3), new MockValueObject<number>(4)]
        ])
      );
      const copied: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.of<MockValueObject<number>, MockValueObject<number>>(project);

      expect(project.size()).toBe(copied.size());
      expect(project.get(new MockValueObject<number>(1))).not.toBeNull();
      expect(project.get(new MockValueObject<number>(1))).toBe(copied.get(new MockValueObject<number>(1)));
      expect(project.get(new MockValueObject<number>(3))).not.toBeNull();
      expect(project.get(new MockValueObject<number>(3))).toBe(copied.get(new MockValueObject<number>(3)));

      project.set(new MockValueObject<number>(5), new MockValueObject<number>(6));

      expect(project.size()).not.toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns MutableAddress.empty() when set size is 0', () => {
      expect.assertions(1);

      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([])
      );

      expect(project.isEmpty()).toBe(true);
    });

    it('returns instance', () => {
      expect.assertions(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [new MockValueObject<number>(1), new MockValueObject<number>(2)],
          [new MockValueObject<number>(5), new MockValueObject<number>(6)]
        ])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
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
    it('does not return singleton instance', () => {
      expect.assertions(1);

      expect(MutableProject.empty<MockValueObject<number>, MockValueObject<number>>()).not.toBe(MutableProject.empty<MockValueObject<number>, MockValueObject<number>>());
    });

    it('always returns 0-size set', () => {
      expect.assertions(1);

      expect(MutableProject.empty<MockValueObject<number>, MockValueObject<number>>().isEmpty()).toBe(true);
    });
  });

  describe('set', () => {
    it('can extend mutably', () => {
      expect.assertions(7);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.empty<MockValueObject<number>, MockValueObject<number>>();

      expect(project1.size()).toBe(0);

      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value1);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(1);

      const project3: MutableProject<MockValueObject<number>, MockValueObject<number>> = project2.set(key2, value2);

      expect(project1).toBe(project2);
      expect(project2).toBe(project3);
      expect(project3).toBe(project1);
      expect(project1.size()).toBe(2);
    });

    it('overwrites when the keys are already contained', () => {
      expect.assertions(3);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value2);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.get(key1)).toBe(value2);
    });

    it('also can overwrite when the other same key value objects are already contained', () => {
      expect.assertions(4);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(1);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(3);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value1]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key2, value2);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.get(key1)).toBe(value2);
      expect(project2.get(key2)).toBe(value2);
    });
  });

  describe('remove', () => {
    it('can remove retaining key if it contains', () => {
      expect.assertions(2);

      const key: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project1).toBe(project2);
      expect(project2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      expect.assertions(2);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(2);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value]])
      );
      const beforeLength: number = project.size();

      expect(project.remove(key2)).toBe(project);
      expect(project.size()).toBe(beforeLength);
    });

    it('does nothing when the project is empty', () => {
      expect.assertions(1);

      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.empty<MockValueObject<number>, MockValueObject<number>>();

      expect(project.remove(new MockValueObject<number>(1))).toBe(project);
    });

    it('returns the removed Project', () => {
      expect.assertions(2);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key3: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key3);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      expect.assertions(2);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);

      const value: MockValueObject<number> = new MockValueObject<number>(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([[key1, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
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

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.map<MockValueObject<number>>((v: MockValueObject<number>) => {
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
    it('returns shallow-copied instance', () => {
      expect.assertions(7);

      const key1: MockValueObject<number> = new MockValueObject<number>(1);
      const key2: MockValueObject<number> = new MockValueObject<number>(3);
      const key3: MockValueObject<number> = new MockValueObject<number>(5);

      const value1: MockValueObject<number> = new MockValueObject<number>(2);
      const value2: MockValueObject<number> = new MockValueObject<number>(4);
      const value3: MockValueObject<number> = new MockValueObject<number>(6);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map<MockValueObject<number>, MockValueObject<number>>([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.duplicate();

      expect(project1.size()).toBe(project2.size());
      expect(project1).not.toBe(project2);
      expect(project2).toBe(project2.set(key3, value3));
      project1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(project2.has(k)).toBe(true);
        expect(project2.contains(v)).toBe(true);
      });
    });
  });
});
