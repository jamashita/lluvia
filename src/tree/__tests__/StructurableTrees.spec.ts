import type { Nullable } from '@jamashita/anden/type';
import { ImmutableAddress } from '../../address/index.js';
import { ImmutableDictionary } from '../../dictionary/index.js';
import { MutableSequence } from '../../sequence/index.js';
import { ClosureTable } from '../ClosureTable/ClosureTable.js';
import type { ClosureTableHierarchies } from '../ClosureTable/ClosureTableHierarchies.js';
import { MockClosureTableHierarchies } from '../ClosureTable/mock/MockClosureTableHierarchies.js';
import { MockClosureTableHierarchy } from '../ClosureTable/mock/MockClosureTableHierarchy.js';
import { MockTreeID } from '../mock/MockTreeID.js';
import { MockTreeObject } from '../mock/MockTreeObject.js';
import { StructurableTree } from '../StructurableTree.js';
import { StructurableTrees } from '../StructurableTrees.js';
import { TreeError } from '../TreeError.js';
import { StructurableTreeNode } from '../TreeNode/StructurableTreeNode.js';

describe('StructurableTrees', () => {
  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect(StructurableTrees.empty()).not.toBe(StructurableTrees.empty());
    });
  });

  describe('ofTable', () => {
    it('returns StructurableTrees.empty() when empty ClosureTable<MockTreeID> and empty Dictionary<MockTreeID, MockTreeObject<MockTreeID>> given', () => {
      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.empty();

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      expect(trees.size()).toBe(0);
      expect(trees).not.toBe(StructurableTrees.empty());
    });

    it('throws TreeError when empty ClosureTable<MockTreeID> given', () => {
      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty();
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([new MockTreeObject(id)]);

      expect(() => {
        StructurableTrees.ofTable(table, values);
      }).toThrow(TreeError);
    });

    it('throws TreeError when empty Dictionary<MockTreeID, MockTreeObject<MockTreeID>> given', () => {
      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(new MockClosureTableHierarchies(new MockClosureTableHierarchy(id, id)));
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.empty();

      expect(() => {
        StructurableTrees.ofTable(table, values);
      }).toThrow(TreeError);
    });

    it('throws TreeError when values do not have such key', () => {
      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(new MockClosureTableHierarchies(new MockClosureTableHierarchy(id1, id1)));
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([new MockTreeObject(id2)]);

      expect(() => {
        StructurableTrees.ofTable(table, values);
      }).toThrow(TreeError);
    });

    it('returns one simplest flat Tree', () => {
      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(new MockClosureTableHierarchies(new MockClosureTableHierarchy(id, id)));
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([new MockTreeObject(id)]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      expect(trees.size()).toBe(1);

      const tree: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id);

      expect(tree).not.toBeNull();
      expect(tree?.getRoot().size()).toBe(1);
      expect(tree?.getRoot().getTreeID()).toBe(id);
      expect(tree?.getRoot().getChildren().size()).toBe(0);
    });

    it('returns 2 or more simplest flat Trees', () => {
      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(
        new MockClosureTableHierarchies(new MockClosureTableHierarchy(id1, id1), new MockClosureTableHierarchy(id2, id2))
      );
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([new MockTreeObject(id1), new MockTreeObject(id2)]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      expect(trees.size()).toBe(2);

      const tree1: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id1);

      expect(tree1).not.toBeNull();
      expect(tree1?.getRoot().size()).toBe(1);
      expect(tree1?.getRoot().getTreeID()).toBe(id1);
      expect(tree1?.getRoot().getChildren().size()).toBe(0);

      const tree2: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id1);

      expect(tree2).not.toBeNull();
      expect(tree2?.getRoot().size()).toBe(1);
      expect(tree2?.getRoot().getTreeID()).toBe(id1);
      expect(tree2?.getRoot().getChildren().size()).toBe(0);
    });

    it('returns one complex Tree', () => {
      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');
      const id6: MockTreeID = new MockTreeID('id 6');
      const id7: MockTreeID = new MockTreeID('id 7');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(
        new MockClosureTableHierarchies(
          new MockClosureTableHierarchy(id1, id1),
          new MockClosureTableHierarchy(id2, id2),
          new MockClosureTableHierarchy(id3, id3),
          new MockClosureTableHierarchy(id4, id4),
          new MockClosureTableHierarchy(id1, id2),
          new MockClosureTableHierarchy(id1, id3),
          new MockClosureTableHierarchy(id1, id4),
          new MockClosureTableHierarchy(id3, id4),
          new MockClosureTableHierarchy(id5, id5),
          new MockClosureTableHierarchy(id6, id6),
          new MockClosureTableHierarchy(id7, id7),
          new MockClosureTableHierarchy(id5, id6),
          new MockClosureTableHierarchy(id5, id7)
        )
      );
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([
        new MockTreeObject(id1),
        new MockTreeObject(id2),
        new MockTreeObject(id3),
        new MockTreeObject(id4),
        new MockTreeObject(id5),
        new MockTreeObject(id6),
        new MockTreeObject(id7)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      expect(trees.size()).toBe(2);

      const tree1: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id1);

      if (tree1 === null) {
        throw new Error();
      }

      const root1: StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = tree1.getRoot();

      expect(root1.size()).toBe(4);
      expect(root1.getTreeID()).toBe(id1);
      expect(root1.getChildren().size()).toBe(2);

      let i = 0;

      for (const [, v] of root1.getChildren()) {
        switch (i) {
          case 0: {
            expect(v.getTreeID()).toBe(id2);
            expect(v.isLeaf()).toBe(true);

            break;
          }
          case 1: {
            expect(v.getTreeID()).toBe(id3);
            expect(v.isLeaf()).toBe(false);

            expect(v.getChildren().size()).toBe(1);

            for (const [, vv] of v.getChildren()) {
              expect(vv.getTreeID()).toBe(id4);
              expect(vv.isLeaf()).toBe(true);
            }

            break;
          }
          default: {
            throw new Error();
          }
        }
        i++;
      }

      const tree2: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id5);

      if (tree2 === null) {
        throw new Error();
      }

      const root2: StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = tree2.getRoot();

      expect(root2.size()).toBe(3);
      expect(root2.getTreeID()).toBe(id5);
      expect(root2.getChildren().size()).toBe(2);

      i = 0;

      for (const [, v] of root2.getChildren()) {
        switch (i) {
          case 0: {
            expect(v.getTreeID()).toBe(id6);
            expect(v.isLeaf()).toBe(true);

            break;
          }
          case 1: {
            expect(v.getTreeID()).toBe(id7);
            expect(v.isLeaf()).toBe(true);

            break;
          }
          default: {
            throw new Error();
          }
        }
        i++;
      }
    });
  });

  describe('add', () => {
    it('add one tree into empty trees', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');

      const tree1: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(new MockTreeObject(id1))
      );

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofDictionary(ImmutableDictionary.empty());

      expect(trees.isEmpty()).toBe(true);

      trees.add(tree1);

      expect(trees.isEmpty()).toBe(false);
      expect(trees.size()).toBe(1);
      // biome-ignore lint/complexity/noForEach: <explanation>
      trees.forEach((obj: MockTreeObject<MockTreeID>) => {
        expect(obj.getTreeID()).toBe(id1);
      });
    });

    it('add one tree into simple trees', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const id4: MockTreeID = new MockTreeID('tree id 4');
      const id5: MockTreeID = new MockTreeID('tree id 5');
      const id6: MockTreeID = new MockTreeID('tree id 6');
      const id7: MockTreeID = new MockTreeID('tree id 7');
      const ids: Array<MockTreeID> = [id1, id2, id3, id4, id5, id6, id7];

      const tree1: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(id1),
          ImmutableAddress.ofSet(
            new Set([
              StructurableTreeNode.ofValue(new MockTreeObject(id2)),
              StructurableTreeNode.ofValue(
                new MockTreeObject(id3),
                ImmutableAddress.ofSet(new Set([StructurableTreeNode.ofValue(new MockTreeObject(id4))]))
              )
            ])
          )
        )
      );
      const tree2: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(id5),
          ImmutableAddress.ofSet(new Set([StructurableTreeNode.ofValue(new MockTreeObject(id6))]))
        )
      );
      const tree3: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(new MockTreeObject(id7))
      );

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofDictionary(
        ImmutableDictionary.ofMap(
          new Map([
            [tree1.getTreeID(), tree1],
            [tree2.getTreeID(), tree2]
          ])
        )
      );
      let i = 0;

      expect(trees.size()).toBe(2);

      trees.add(tree3);

      expect(trees.size()).toBe(3);
      // biome-ignore lint/complexity/noForEach: <explanation>
      trees.forEach((obj: MockTreeObject<MockTreeID>) => {
        expect(obj.getTreeID()).toBe(ids[i]);
        i++;
      });
    });
  });

  describe('has', () => {
    it('returns true if given key exists', () => {
      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');
      const id6: MockTreeID = new MockTreeID('id 6');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(
        new MockClosureTableHierarchies(
          new MockClosureTableHierarchy(id1, id1),
          new MockClosureTableHierarchy(id2, id2),
          new MockClosureTableHierarchy(id3, id3),
          new MockClosureTableHierarchy(id4, id4),
          new MockClosureTableHierarchy(id1, id2),
          new MockClosureTableHierarchy(id1, id3),
          new MockClosureTableHierarchy(id1, id4),
          new MockClosureTableHierarchy(id3, id4),
          new MockClosureTableHierarchy(id5, id5)
        )
      );
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([
        new MockTreeObject(id1),
        new MockTreeObject(id2),
        new MockTreeObject(id3),
        new MockTreeObject(id4),
        new MockTreeObject(id5)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      expect(trees.has(id1)).toBe(true);
      expect(trees.has(id2)).toBe(true);
      expect(trees.has(id3)).toBe(true);
      expect(trees.has(id4)).toBe(true);
      expect(trees.has(id5)).toBe(true);
      expect(trees.has(id6)).toBe(false);
    });
  });

  describe('toHierarchies', () => {
    it('returns one-length array when no no-children one tree given', () => {
      const id1: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(new MockClosureTableHierarchies(new MockClosureTableHierarchy(id1, id1)));
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([new MockTreeObject(id1)]);
      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      const hierarchies: ClosureTableHierarchies<MockTreeID> = trees.toHierarchies();

      expect(hierarchies.size()).toBe(1);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('id 1');
    });

    it('returns true if given key exists', () => {
      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');

      const table: ClosureTable<MockTreeID> = ClosureTable.of(
        new MockClosureTableHierarchies(
          new MockClosureTableHierarchy(id1, id1),
          new MockClosureTableHierarchy(id2, id2),
          new MockClosureTableHierarchy(id3, id3),
          new MockClosureTableHierarchy(id4, id4),
          new MockClosureTableHierarchy(id1, id2),
          new MockClosureTableHierarchy(id1, id3),
          new MockClosureTableHierarchy(id1, id4),
          new MockClosureTableHierarchy(id3, id4),
          new MockClosureTableHierarchy(id5, id5)
        )
      );
      const values: MutableSequence<MockTreeObject<MockTreeID>> = MutableSequence.ofArray([
        new MockTreeObject(id1),
        new MockTreeObject(id2),
        new MockTreeObject(id3),
        new MockTreeObject(id4),
        new MockTreeObject(id5)
      ]);
      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable(table, values);

      const hierarchies: ClosureTableHierarchies<MockTreeID> = trees.toHierarchies();

      expect(hierarchies.get(0)?.getAncestor().get()).toBe('id 5');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('id 5');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('id 1');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('id 2');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('id 3');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('id 4');
      expect(hierarchies.get(5)?.getAncestor().get()).toBe('id 2');
      expect(hierarchies.get(5)?.getOffspring().get()).toBe('id 2');
      expect(hierarchies.get(6)?.getAncestor().get()).toBe('id 3');
      expect(hierarchies.get(6)?.getOffspring().get()).toBe('id 3');
      expect(hierarchies.get(7)?.getAncestor().get()).toBe('id 3');
      expect(hierarchies.get(7)?.getOffspring().get()).toBe('id 4');
      expect(hierarchies.get(8)?.getAncestor().get()).toBe('id 4');
      expect(hierarchies.get(8)?.getOffspring().get()).toBe('id 4');
    });
  });
});
