import { MockValueObject } from '@jamashita/anden-object';
import { ImmutableProject } from '../ImmutableProject';

describe('ImmutableProject', () => {
  describe('of', () => {
    it('returns copied collection, does not use the same one', () => {
      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(3), new MockValueObject(4)]
        ])
      );
      const copied: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.of(project);

      expect(project.size()).toBe(copied.size());
      project.forEach((v: MockValueObject<number>, k: MockValueObject<number>) => {
        expect(copied.has(k)).toBe(true);
        expect(copied.contains(v)).toBe(true);
      });

      project.set(new MockValueObject(5), new MockValueObject(6));

      expect(project.size()).toBe(copied.size());
    });
  });

  describe('ofMap', () => {
    it('returns ImmutableProject.empty() when the size is 0', () => {
      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap<MockValueObject<number>, MockValueObject<number>>(
        new Map()
      );

      expect(project.isEmpty()).toBe(true);
      expect(project).toBe(ImmutableProject.empty());
    });

    it('returns instance', () => {
      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([
          [new MockValueObject(1), new MockValueObject(2)],
          [new MockValueObject(5), new MockValueObject(6)]
        ])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
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
    it('returns singleton singleton instance', () => {
      expect(ImmutableProject.empty()).toBe(ImmutableProject.empty());
    });

    it('always returns 0-size map', () => {
      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty();

      expect(project.size()).toBe(0);
    });
  });

  describe('set', () => {
    it('can extend immutably', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty();

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
      const key1: MockValueObject<number> = new MockValueObject(1);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key1, value1]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.set(key1, value2);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(1);
      expect(project2.get(key1)).toBe(value2);
    });

    it('stores key-value when the keys are not contained yet', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(3);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key1, value1]])
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
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(0);
    });

    it('does nothing when there is no such key', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key1, value]])
      );
      const beforeLength: number = project.size();

      expect(project.remove(key2)).toBe(project);
      expect(project.size()).toBe(beforeLength);
    });

    it('does nothing when the project is empty', () => {
      const project: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.empty();

      expect(project.remove(new MockValueObject(1))).toBe(project);
    });

    it('returns the removed Project', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key1, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key2);

      expect(project1).not.toBe(project2);
      expect(project1.size()).toBe(1);
      expect(project2.size()).toBe(0);
    });

    it('returns ImmutableProject.empty() when the size will be 0', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.remove(key);

      expect(project2).toBe(ImmutableProject.empty());
    });
  });

  describe('isEmpty', () => {
    it('returns true if the value size is 0', () => {
      const key: MockValueObject<number> = new MockValueObject(1);

      const value: MockValueObject<number> = new MockValueObject(2);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([[key, value]])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
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

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([
          [key1, value1],
          [key2, value2]
        ])
      );
      const project2: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = project1.map((v: MockValueObject<number>): MockValueObject<number> => {
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

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = ImmutableProject.ofMap(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered1: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((v: MockValueObject<string>) => {
        return v.get().length % 2 === 0;
      });
      const filtered2: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((_v: MockValueObject<string>, k: MockValueObject<number>) => {
        return k.get() % 2 === 1;
      });
      const filtered3: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((v: MockValueObject<string>) => {
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

    it('return ImmutableProject.empty() when matches nothing', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(2);
      const key3: MockValueObject<number> = new MockValueObject(3);
      const key4: MockValueObject<number> = new MockValueObject(4);

      const value1: MockValueObject<string> = new MockValueObject('a');
      const value2: MockValueObject<string> = new MockValueObject('aa');
      const value3: MockValueObject<string> = new MockValueObject('aaa');
      const value4: MockValueObject<string> = new MockValueObject('aaaa');

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = ImmutableProject.ofMap(
        new Map([
          [key1, value1],
          [key2, value2],
          [key3, value3],
          [key4, value4]
        ])
      );
      const filtered: ImmutableProject<MockValueObject<number>, MockValueObject<string>> = project1.filter((v: MockValueObject<string>) => {
        return v.get() === 'aaaaa';
      });

      expect(filtered.size()).toBe(0);
      expect(filtered).toBe(ImmutableProject.empty());
    });
  });

  describe('duplicate', () => {
    it('returns ImmutableProject.empty() when there are no key-value pairs', () => {
      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([])
      );

      expect(project1.duplicate()).toBe(ImmutableProject.empty());
    });

    it('returns shallow-copied instance', () => {
      const key1: MockValueObject<number> = new MockValueObject(1);
      const key2: MockValueObject<number> = new MockValueObject(3);
      const key3: MockValueObject<number> = new MockValueObject(5);

      const value1: MockValueObject<number> = new MockValueObject(2);
      const value2: MockValueObject<number> = new MockValueObject(4);
      const value3: MockValueObject<number> = new MockValueObject(6);

      const project1: ImmutableProject<MockValueObject<number>, MockValueObject<number>> = ImmutableProject.ofMap(
        new Map([
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
