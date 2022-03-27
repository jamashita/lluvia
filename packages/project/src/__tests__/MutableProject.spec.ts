import { MockValueObject } from '@jamashita/anden-object';
import { MutableProject } from '../MutableProject';

describe('MutableProject', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(3), new MockValueObject(4)]
        ])
      );
      const copied: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.of(project);

      expect(project.size()).toBe(copied.size());
      expect(project.get(new MockValueObject(1))).not.toBeNull();
      expect(project.get(new MockValueObject(1))).toBe(copied.get(new MockValueObject(1)));
      expect(project.get(new MockValueObject(3))).not.toBeNull();
      expect(project.get(new MockValueObject(3))).toBe(copied.get(new MockValueObject(3)));

      project.set(new MockValueObject(5), new MockValueObject(6));

      expect(project.size()).not.toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns MutableAddress.empty() when set size is 0', () => {
      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([])
      );

      expect(project.isEmpty()).toBe(true);
    });

    it('returns instance', () => {
      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(5), new MockValueObject(6)]
        ])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([
          [new MockValueObject(3), new MockValueObject(4)],
          [new MockValueObject(7), new MockValueObject(8)],
          [new MockValueObject(9), new MockValueObject(10)]
        ])
      );

      expect(project1.size()).toBe(2);
      expect(project2.size()).toBe(3);
    });
  });

  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect(MutableProject.empty()).not.toBe(MutableProject.empty());
    });

    it('always returns 0-size set', () => {
      expect(MutableProject.empty().isEmpty()).toBe(true);
    });
  });

  describe('set', () => {
    it('can extend mutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.empty();

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
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key1, value1]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value2);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.get(key1)).toBe(value2);
    });

    it('also can overwrite when the other same key value objects are already contained', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key1, value1]])
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
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project1).toBe(project2);
      expect(project2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key1, value]])
      );
      const beforeLength: number = project.size();

      expect(project.remove(key2)).toBe(project);
      expect(project.size()).toBe(beforeLength);
    });

    it('does nothing when the project is empty', () => {
      const project: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.empty();

      expect(project.remove(new MockValueObject(1))).toBe(project);
    });

    it('returns the removed Project', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key3: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key1, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key3);

      expect(project1).toBe(project2);
      expect(project1.size()).toBe(0);
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([[key1, value]])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([])
      );

      expect(project1.isEmpty()).toBe(false);
      expect(project2.isEmpty()).toBe(true);
    });
  });

  describe('map', () => {
    it('execute the mapper function and returns mapped Address immutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: MutableProject<MockValueObject<number>, MockValueObject<number>> = project1.map((v: MockValueObject<number>): MockValueObject<number> => {
        return new MockValueObject(v.get() + 10);
      });

      expect(project1.size()).toBe(project2.size());
      expect(project1).not.toBe(project2);
      project1.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(project2.get(k)?.get()).toBe(v.get() + 10);
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

      const project1: MutableProject<MockValueObject<number>, MockValueObject<string>> = MutableProject.ofMap(
        new Map<MockValueObject<number>, MockValueObject<string>>([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered1: MutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((v: MockValueObject<string>) => {
        return v.get().length % 2 === 0;
      });
      const filtered2: MutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((_v: MockValueObject<string>, k: MockValueObject<number>) => {
        return k.get() % 2 === 1;
      });
      const filtered3: MutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((v: MockValueObject<string>) => {
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

  describe('duplicate', () => {
    it('returns shallow-copied instance', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);
      const key3: MockValueObject<number> = new MockValueObject(5);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const project1: MutableProject<MockValueObject<number>, MockValueObject<number>> = MutableProject.ofMap(
        new Map([
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
