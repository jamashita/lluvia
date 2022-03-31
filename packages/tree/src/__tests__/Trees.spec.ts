import { MockValueObject } from '@jamashita/anden-object';
import { Nullable } from '@jamashita/anden-type';
import { MockAddress } from '@jamashita/lluvia-address';
import { MockProject } from '@jamashita/lluvia-project';
import { MockTree } from '../mock/MockTree';
import { MockTreeID } from '../mock/MockTreeID';
import { MockTreeObject } from '../mock/MockTreeObject';
import { MockTrees } from '../mock/MockTrees';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode';

describe('Trees', () => {
  describe('contains', () => {
    it('delegates its retaining tree', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      tree.contains = fn;

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      trees.contains(new MockTreeObject<MockTreeID>(id));

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      expect(trees.equals(trees)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      expect(trees.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its retaining project', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      // @ts-expect-error
      trees.trees = project;
      project.equals = fn;

      trees.equals(new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
            [id, new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject<MockTreeID>(id)))]
          ])
        )
      ));

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('every', () => {
    it('returns true when all objects pass the condition', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const every: boolean = trees.every((o: MockTreeObject<MockTreeID>) => {
        return o.getTreeID().toString().includes('tree id');
      });

      expect(every).toBe(true);
    });

    it('returns false when one of the objects does not pass the condition', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const every: boolean = trees.every((o: MockTreeObject<MockTreeID>) => {
        return !o.getTreeID().equals(id3);
      });

      expect(every).toBe(false);
    });
  });

  describe('find', () => {
    it('returns found one when the condition passes', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const obj: Nullable<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>> = trees.find((o: MockTreeObject<MockTreeID>) => {
        return o.getTreeID().equals(id3);
      });

      expect(obj?.getValue().getTreeID()).toBe(id3);
    });

    it('returns null when any conditions do not pass', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const obj: Nullable<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>> = trees.find((o: MockTreeObject<MockTreeID>) => {
        return o.getTreeID().toString().includes('idea');
      });

      expect(obj).toBeNull();
    });
  });

  describe('forEach', () => {
    it('retrieves inner trees', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const ids: Array<MockTreeID> = [
        id1,
        id2,
        id3
      ];

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );


      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);
      let i: number = 0;

      trees.forEach((o: MockTreeObject<MockTreeID>) => {
        expect(o.getTreeID()).toBe(ids[i]);
        i++;
      });
    });
  });

  describe('get', () => {
    it('delegates its retaining project', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      // @ts-expect-error
      trees.trees = project;
      project.get = fn;

      trees.get(new MockTreeID('tree id 1010'));

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('isEmpty', () => {
    it('delegates its retaining project', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      // @ts-expect-error
      trees.trees = project;
      project.isEmpty = fn;

      trees.isEmpty();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('size', () => {
    it('delegates its retaining project', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      // @ts-expect-error
      trees.trees = project;
      project.size = fn;

      trees.size();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('some', () => {
    it('returns true when one of the objects passes the condition', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const some: boolean = trees.some((o: MockTreeObject<MockTreeID>) => {
        return o.getTreeID().equals(id3);
      });

      expect(some).toBe(true);
    });

    it('returns false when none of the objects does not pass the condition', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      const some: boolean = trees.some((o: MockTreeObject<MockTreeID>) => {
        return o.getTreeID().toString().includes('idea');
      });

      expect(some).toBe(false);
    });
  });

  describe('toString', () => {
    it('delegates its retaining project', () => {
      const fn: jest.Mock = jest.fn();

      const id: MockTreeID = new MockTreeID('tree id');
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id)
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id, tree]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      // @ts-expect-error
      trees.trees = project;
      project.toString = fn;

      trees.toString();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('values', () => {
    it('returns all objects', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const ids: Array<MockTreeID> = [
        id1,
        id2,
        id3
      ];

      const tree1: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );
      const tree2: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id2),
          new MockAddress<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3)
              )
            ])
          )
        )
      );

      const project: MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>> = new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
        new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
          [id1, tree1],
          [id2, tree2]
        ])
      );

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);
      let i: number = 0;

      for (const o of trees.values()) {
        expect(o.getTreeID()).toBe(ids[i]);
        i++;
      }
    });
  });
});
