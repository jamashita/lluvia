import { MutableAddress } from '@jamashita/lluvia-address';
import { ClosureTableHierarchies } from '../ClosureTable/ClosureTableHierarchies';
import { MockTreeID } from '../mock/MockTreeID';
import { MockTreeObject } from '../mock/MockTreeObject';
import { StructurableTree } from '../StructurableTree';
import { StructurableTreeNode } from '../TreeNode/StructurableTreeNode';

describe('StructurableTree', () => {
  describe('getTreeID', () => {
    it('delegates its root instance', () => {
      const fn: jest.Mock = jest.fn();

      const root: StructurableTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock')));

      root.getTreeID = fn;

      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(root);

      tree.getTreeID();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });

  describe('has', () => {
    it('returns true when the value is contained in the tree node', () => {
      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              StructurableTreeNode.ofValue(
                new MockTreeObject(new MockTreeID('mock 2')),
                MutableAddress.ofSet(
                  new Set([
                    StructurableTreeNode.ofValue(
                      new MockTreeObject(new MockTreeID('mock 3')),
                      MutableAddress.ofSet(
                        new Set([
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 4'))),
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 5')))
                        ])
                      )
                    ),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 6'))),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 7')))
                  ])
                )
              ),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 8'))),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 9')))
            ])
          )
        )
      );

      expect(tree.has(new MockTreeID('mock 1'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 2'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 3'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 4'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 5'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 6'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 7'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 8'))).toBe(true);
      expect(tree.has(new MockTreeID('mock 9'))).toBe(true);
    });

    it('returns false when the value is not contained in the tree node', () => {
      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              StructurableTreeNode.ofValue(
                new MockTreeObject(new MockTreeID('mock 2')),
                MutableAddress.ofSet(
                  new Set([
                    StructurableTreeNode.ofValue(
                      new MockTreeObject(new MockTreeID('mock 3')),
                      MutableAddress.ofSet(
                        new Set([
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 4'))),
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 5')))
                        ])
                      )
                    ),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 6'))),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 7')))
                  ])
                )
              ),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 8'))),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 9')))
            ])
          )
        )
      );

      expect(tree.has(new MockTreeID('mock 0'))).toBe(false);
      expect(tree.has(new MockTreeID('mock 10'))).toBe(false);
    });
  });

  describe('toHierarchies', () => {
    it('returns one-length array when no no-children tree given', () => {
      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 1')))
      );

      const hierarchies: ClosureTableHierarchies<MockTreeID> = tree.toHierarchies();

      expect(hierarchies.size()).toBe(1);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
    });

    it('returns simpler array when simplest Tree given', () => {
      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2'))),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 3')))
            ])
          )
        )
      );

      const hierarchies: ClosureTableHierarchies<MockTreeID> = tree.toHierarchies();

      expect(hierarchies.size()).toBe(5);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('mock 3');
    });

    it('returns closure table array when complex Tree given', () => {
      const tree: StructurableTree<MockTreeID, MockTreeObject<MockTreeID>> = StructurableTree.of(
        StructurableTreeNode.ofValue(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              StructurableTreeNode.ofValue(
                new MockTreeObject(new MockTreeID('mock 2')),
                MutableAddress.ofSet(
                  new Set([
                    StructurableTreeNode.ofValue(
                      new MockTreeObject(new MockTreeID('mock 3')),
                      MutableAddress.ofSet(
                        new Set([
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 4'))),
                          StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 5')))
                        ])
                      )
                    ),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 6'))),
                    StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 7')))
                  ])
                )
              ),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 8'))),
              StructurableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 9')))
            ])
          )
        )
      );

      const hierarchies: ClosureTableHierarchies<MockTreeID> = tree.toHierarchies();

      expect(hierarchies.size()).toBe(24);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(5)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(5)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(6)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(6)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(7)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(7)?.getOffspring().get()).toBe('mock 8');
      expect(hierarchies.get(8)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(8)?.getOffspring().get()).toBe('mock 9');
      expect(hierarchies.get(9)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(9)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(10)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(10)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(11)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(11)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(12)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(12)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(13)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(13)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(14)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(14)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(15)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(15)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(16)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(16)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(17)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(17)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(18)?.getAncestor().get()).toBe('mock 4');
      expect(hierarchies.get(18)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(19)?.getAncestor().get()).toBe('mock 5');
      expect(hierarchies.get(19)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(20)?.getAncestor().get()).toBe('mock 6');
      expect(hierarchies.get(20)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(21)?.getAncestor().get()).toBe('mock 7');
      expect(hierarchies.get(21)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(22)?.getAncestor().get()).toBe('mock 8');
      expect(hierarchies.get(22)?.getOffspring().get()).toBe('mock 8');
      expect(hierarchies.get(23)?.getAncestor().get()).toBe('mock 9');
      expect(hierarchies.get(23)?.getOffspring().get()).toBe('mock 9');
    });
  });
});
