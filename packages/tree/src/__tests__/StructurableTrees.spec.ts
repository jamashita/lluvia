import { Nullable } from '@jamashita/anden-type';
import { ImmutableAddress } from '@jamashita/lluvia-address';
import { ImmutableProject } from '@jamashita/lluvia-project';
import { ImmutableSequence } from '@jamashita/lluvia-sequence';
import { ClosureTable } from '../ClosureTable/ClosureTable.js';
import { ClosureTableHierarchies } from '../ClosureTable/ClosureTableHierarchies.js';
import { MockClosureTableHierarchies } from '../ClosureTable/Mock/MockClosureTableHierarchies.js';
import { MockClosureTableHierarchy } from '../ClosureTable/Mock/MockClosureTableHierarchy.js';
import { TreeError } from '../Error/TreeError.js';
import { MockTreeID } from '../Mock/MockTreeID.js';
import { MockTreeObject } from '../Mock/MockTreeObject.js';
import { StructurableTree } from '../StructurableTree.js';
import { StructurableTrees } from '../StructurableTrees.js';
import { StructurableTreeNode } from '../TreeNode/StructurableTreeNode.js';

describe('StructurableTrees', () => {
  describe('ofTable', () => {
    it('returns StructurableTrees.empty<MockTreeID, MockTreeObject<MockTreeID>>() when empty ClosureTable<MockTreeID> and empty Project<MockTreeID, MockTreeObject<MockTreeID>> given', () => {
      expect.assertions(2);

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.empty<MockTreeObject<MockTreeID>>();

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

      expect(trees.size()).toBe(0);
      expect(trees).not.toBe(StructurableTrees.empty<MockTreeID, MockTreeObject<MockTreeID>>());
    });

    it('throws TreeError when empty ClosureTable<MockTreeID> given', () => {
      expect.assertions(1);

      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.empty<MockTreeID>();
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id)
      ]);

      expect(() => {
        StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);
      }).toThrow(TreeError);
    });

    it('throws TreeError when empty Project<MockTreeID, MockTreeObject<MockTreeID>> given', () => {
      expect.assertions(1);

      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id, id)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.empty<MockTreeObject<MockTreeID>>();

      expect(() => {
        StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);
      }).toThrow(TreeError);
    });

    it('throws TreeError when values do not have such key', () => {
      expect.assertions(1);

      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id2)
      ]);

      expect(() => {
        StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);
      }).toThrow(TreeError);
    });

    it('returns one simplest flat Tree', () => {
      expect.assertions(5);

      const id: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id, id)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

      expect(trees.size()).toBe(1);

      const tree: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id);

      expect(tree).not.toBeNull();
      expect(tree?.getRoot().size()).toBe(1);
      expect(tree?.getRoot().getTreeID()).toBe(id);
      expect(tree?.getRoot().getChildren().size()).toBe(0);
    });

    it('returns 2 or more simplest flat Trees', () => {
      expect.assertions(9);

      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1),
          new MockClosureTableHierarchy<MockTreeID>(id2, id2)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id1),
        new MockTreeObject<MockTreeID>(id2)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

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
      expect.assertions(18);

      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');
      const id6: MockTreeID = new MockTreeID('id 6');
      const id7: MockTreeID = new MockTreeID('id 7');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1),
          new MockClosureTableHierarchy<MockTreeID>(id2, id2),
          new MockClosureTableHierarchy<MockTreeID>(id3, id3),
          new MockClosureTableHierarchy<MockTreeID>(id4, id4),
          new MockClosureTableHierarchy<MockTreeID>(id1, id2),
          new MockClosureTableHierarchy<MockTreeID>(id1, id3),
          new MockClosureTableHierarchy<MockTreeID>(id1, id4),
          new MockClosureTableHierarchy<MockTreeID>(id3, id4),
          new MockClosureTableHierarchy<MockTreeID>(id5, id5),
          new MockClosureTableHierarchy<MockTreeID>(id6, id6),
          new MockClosureTableHierarchy<MockTreeID>(id7, id7),
          new MockClosureTableHierarchy<MockTreeID>(id5, id6),
          new MockClosureTableHierarchy<MockTreeID>(id5, id7)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id1),
        new MockTreeObject<MockTreeID>(id2),
        new MockTreeObject<MockTreeID>(id3),
        new MockTreeObject<MockTreeID>(id4),
        new MockTreeObject<MockTreeID>(id5),
        new MockTreeObject<MockTreeID>(id6),
        new MockTreeObject<MockTreeID>(id7)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

      expect(trees.size()).toBe(2);

      const tree1: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id1);

      if (tree1 === null) {
        fail();

        return;
      }

      const root1: StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = tree1.getRoot();

      expect(root1.size()).toBe(4);
      expect(root1.getTreeID()).toBe(id1);
      expect(root1.getChildren().size()).toBe(2);

      let i: number = 0;

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
            fail();

            return;
          }
        }
        i++;
      }

      const tree2: Nullable<StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>> = trees.get(id5);

      if (tree2 === null) {
        fail();

        return;
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
            fail();

            return;
          }
        }
        i++;
      }
    });
  });

  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect.assertions(1);

      expect(StructurableTrees.empty()).not.toBe(StructurableTrees.empty());
    });
  });

  describe('add', () => {
    it('add one tree into empty trees', () => {
      expect.assertions(4);

      const id1: MockTreeID = new MockTreeID('tree id 1');

      const tree1: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of<MockTreeID, MockTreeObject<MockTreeID>>(
        StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofProject<MockTreeID, MockTreeObject<MockTreeID>>(
        ImmutableProject.empty<MockTreeID, StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>>()
      );

      expect(trees.isEmpty()).toBe(true);

      trees.add(tree1);

      expect(trees.isEmpty()).toBe(false);
      expect(trees.size()).toBe(1);
      trees.forEach((obj: MockTreeObject<MockTreeID>) => {
        expect(obj.getTreeID()).toBe(id1);
      });
    });

    it('add one tree into simple trees', () => {
      expect.assertions(9);

      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const id4: MockTreeID = new MockTreeID('tree id 4');
      const id5: MockTreeID = new MockTreeID('tree id 5');
      const id6: MockTreeID = new MockTreeID('tree id 6');
      const id7: MockTreeID = new MockTreeID('tree id 7');
      const ids: Array<MockTreeID> = [
        id1,
        id2,
        id3,
        id4,
        id5,
        id6,
        id7
      ];

      const tree1: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of<MockTreeID, MockTreeObject<MockTreeID>>(
        StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1),
          ImmutableAddress.ofSet<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id2)
              ),
              StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3),
                ImmutableAddress.ofSet<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject<MockTreeID>(id4)
                    )
                  ])
                )
              )
            ])
          )
        )
      );
      const tree2: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of<MockTreeID, MockTreeObject<MockTreeID>>(
        StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id5),
          ImmutableAddress.ofSet<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id6)
              )
            ])
          )
        )
      );
      const tree3: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of<MockTreeID, MockTreeObject<MockTreeID>>(
        StructurableTreeNode.ofValue<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id7)
        )
      );

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofProject<MockTreeID, MockTreeObject<MockTreeID>>(
        ImmutableProject.ofMap<MockTreeID, StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Map<MockTreeID, StructurableTree<MockTreeID, MockTreeObject<MockTreeID>>>([
            [tree1.getTreeID(), tree1],
            [tree2.getTreeID(), tree2]
          ])
        )
      );
      let i: number = 0;

      expect(trees.size()).toBe(2);

      trees.add(tree3);

      expect(trees.size()).toBe(3);
      trees.forEach((obj: MockTreeObject<MockTreeID>) => {
        expect(obj.getTreeID()).toBe(ids[i]);
        i++;
      });
    });
  });

  describe('has', () => {
    it('returns true if given key exists', () => {
      expect.assertions(6);

      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');
      const id6: MockTreeID = new MockTreeID('id 6');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1),
          new MockClosureTableHierarchy<MockTreeID>(id2, id2),
          new MockClosureTableHierarchy<MockTreeID>(id3, id3),
          new MockClosureTableHierarchy<MockTreeID>(id4, id4),
          new MockClosureTableHierarchy<MockTreeID>(id1, id2),
          new MockClosureTableHierarchy<MockTreeID>(id1, id3),
          new MockClosureTableHierarchy<MockTreeID>(id1, id4),
          new MockClosureTableHierarchy<MockTreeID>(id3, id4),
          new MockClosureTableHierarchy<MockTreeID>(id5, id5)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id1),
        new MockTreeObject<MockTreeID>(id2),
        new MockTreeObject<MockTreeID>(id3),
        new MockTreeObject<MockTreeID>(id4),
        new MockTreeObject<MockTreeID>(id5)
      ]);

      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

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
      expect.assertions(3);

      const id1: MockTreeID = new MockTreeID('id 1');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id1)
      ]);
      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

      const hierarchies: ClosureTableHierarchies<MockTreeID> = trees.toHierarchies();

      expect(hierarchies.size()).toBe(1);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('id 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('id 1');
    });

    it('returns true if given key exists', () => {
      expect.assertions(18);

      const id1: MockTreeID = new MockTreeID('id 1');
      const id2: MockTreeID = new MockTreeID('id 2');
      const id3: MockTreeID = new MockTreeID('id 3');
      const id4: MockTreeID = new MockTreeID('id 4');
      const id5: MockTreeID = new MockTreeID('id 5');

      const table: ClosureTable<MockTreeID> = ClosureTable.of<MockTreeID>(
        new MockClosureTableHierarchies<MockTreeID>(
          new MockClosureTableHierarchy<MockTreeID>(id1, id1),
          new MockClosureTableHierarchy<MockTreeID>(id2, id2),
          new MockClosureTableHierarchy<MockTreeID>(id3, id3),
          new MockClosureTableHierarchy<MockTreeID>(id4, id4),
          new MockClosureTableHierarchy<MockTreeID>(id1, id2),
          new MockClosureTableHierarchy<MockTreeID>(id1, id3),
          new MockClosureTableHierarchy<MockTreeID>(id1, id4),
          new MockClosureTableHierarchy<MockTreeID>(id3, id4),
          new MockClosureTableHierarchy<MockTreeID>(id5, id5)
        )
      );
      const values: ImmutableSequence<MockTreeObject<MockTreeID>> = ImmutableSequence.ofArray<MockTreeObject<MockTreeID>>([
        new MockTreeObject<MockTreeID>(id1),
        new MockTreeObject<MockTreeID>(id2),
        new MockTreeObject<MockTreeID>(id3),
        new MockTreeObject<MockTreeID>(id4),
        new MockTreeObject<MockTreeID>(id5)
      ]);
      const trees: StructurableTrees<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTrees.ofTable<MockTreeID, MockTreeObject<MockTreeID>>(table, values);

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
