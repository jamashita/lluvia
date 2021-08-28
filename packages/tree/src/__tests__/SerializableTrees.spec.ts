import { ImmutableAddress } from '@jamashita/lluvia-address';
import { MockTreeID } from '../Mock/MockTreeID';
import { MockTreeObject } from '../Mock/MockTreeObject';
import { SerializableTree } from '../SerializableTree';
import { SerializableTrees } from '../SerializableTrees';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode';

describe('SerializableTrees', () => {
  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect.assertions(2);

      expect(SerializableTrees.empty().size()).toBe(0);
      expect(SerializableTrees.empty()).not.toBe(SerializableTrees.empty());
    });
  });

  describe('add', () => {
    it('add one tree into empty trees', () => {
      expect.assertions(4);

      const id1: MockTreeID = new MockTreeID('tree id 1');

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1)
        )
      );

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress<MockTreeObject<MockTreeID>>(
        ImmutableAddress.empty<SerializableTree<MockTreeObject<MockTreeID>>>()
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

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1),
          ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
            new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id2)
              ),
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3),
                ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
                  new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
                    SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                      new MockTreeObject<MockTreeID>(id4)
                    )
                  ])
                )
              )
            ])
          )
        )
      );
      const tree2: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id5),
          ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
            new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id6)
              )
            ])
          )
        )
      );
      const tree3: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id7)
        )
      );

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress<MockTreeObject<MockTreeID>>(
        ImmutableAddress.ofSet<SerializableTree<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTree<MockTreeObject<MockTreeID>>>([
            tree1,
            tree2
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

  describe('toJSON', () => {
    it('returns ReadonlyArray<TreeNodeJSON>', () => {
      expect.assertions(1);

      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const id4: MockTreeID = new MockTreeID('tree id 4');
      const id5: MockTreeID = new MockTreeID('tree id 5');
      const id6: MockTreeID = new MockTreeID('tree id 6');
      const id7: MockTreeID = new MockTreeID('tree id 7');

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id1),
          ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
            new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id2)
              ),
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id3),
                ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
                  new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
                    SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                      new MockTreeObject<MockTreeID>(id4)
                    )
                  ])
                )
              )
            ])
          )
        )
      );
      const tree2: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id5),
          ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
            new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
                new MockTreeObject<MockTreeID>(id6)
              )
            ])
          )
        )
      );
      const tree3: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(
        SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
          new MockTreeObject<MockTreeID>(id7)
        )
      );

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress<MockTreeObject<MockTreeID>>(
        ImmutableAddress.ofSet<SerializableTree<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTree<MockTreeObject<MockTreeID>>>([
            tree1,
            tree2,
            tree3
          ])
        )
      );

      expect(trees.toJSON()).toStrictEqual([
        {
          value: {
            id: 'tree id 1'
          },
          children: [
            {
              value: {
                id: 'tree id 2'
              },
              children: []
            },
            {
              value: {
                id: 'tree id 3'
              },
              children: [
                {
                  value: {
                    id: 'tree id 4'
                  },
                  children: []
                }
              ]
            }
          ]
        },
        {
          value: {
            id: 'tree id 5'
          },
          children: [
            {
              value: {
                id: 'tree id 6'
              },
              children: []
            }
          ]
        },
        {
          value: {
            id: 'tree id 7'
          },
          children: []
        }
      ]);
    });
  });
});
