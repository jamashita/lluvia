import { MockValueObject } from '@jamashita/anden-object';
import { Nullable } from '@jamashita/anden-type';
import { MockAddress } from '@jamashita/lluvia-address';
import { MockProject } from '@jamashita/lluvia-project';
import sinon, { SinonSpy } from 'sinon';
import { MockTree } from '../Mock/MockTree.js';
import { MockTreeID } from '../Mock/MockTreeID.js';
import { MockTreeObject } from '../Mock/MockTreeObject.js';
import { MockTrees } from '../Mock/MockTrees.js';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode.js';

describe('Trees', () => {
  describe('contains', () => {
    it('delegates its retaining tree', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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

      tree.contains = spy;

      const trees: MockTrees<MockTreeID, MockTreeObject<MockTreeID>> = new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(project);

      trees.contains(new MockTreeObject<MockTreeID>(id));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

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
      expect.assertions(1);

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
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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
      project.equals = spy;

      trees.equals(new MockTrees<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockProject<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Map<MockTreeID, MockTree<MockTreeID, MockTreeObject<MockTreeID>>>([
            [id, new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject<MockTreeID>(id)))]
          ])
        )
      ));

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('returns true when all objects pass the condition', () => {
      expect.assertions(1);

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
      expect.assertions(1);

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

  describe('forEach', () => {
    it('retrieves inner trees', () => {
      expect.assertions(3);

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
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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
      project.get = spy;

      trees.get(new MockTreeID('tree id 1010'));

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its retaining project', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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
      project.isEmpty = spy;

      trees.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its retaining project', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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
      project.toString = spy;

      trees.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its retaining project', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

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
      project.size = spy;

      trees.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('returns true when one of the objects passes the condition', () => {
      expect.assertions(1);

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
      expect.assertions(1);

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

  describe('values', () => {
    it('returns all objects', () => {
      expect.assertions(3);

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

  describe('find', () => {
    it('returns found one when the condition passes', () => {
      expect.assertions(1);

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
      expect.assertions(1);

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
});
