import { MutableAddress } from '../../address/index.js';
import { MockTreeID } from '../mock/MockTreeID.js';
import { MockTreeObject } from '../mock/MockTreeObject.js';
import { SerializableTree } from '../SerializableTree.js';
import { SerializableTrees } from '../SerializableTrees.js';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode.js';

describe('SerializableTrees', () => {
  describe('empty', () => {
    it('does not return singleton instance', () => {
      expect(SerializableTrees.empty().size()).toBe(0);
      expect(SerializableTrees.empty()).not.toBe(SerializableTrees.empty());
    });
  });

  describe('add', () => {
    it('add one tree into empty trees', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(SerializableTreeNode.ofValue(new MockTreeObject(id1)));

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress(MutableAddress.empty());

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

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(
        SerializableTreeNode.ofValue(
          new MockTreeObject(id1),
          MutableAddress.ofSet(
            new Set([
              SerializableTreeNode.ofValue(new MockTreeObject(id2)),
              SerializableTreeNode.ofValue(
                new MockTreeObject(id3),
                MutableAddress.ofSet(new Set([SerializableTreeNode.ofValue(new MockTreeObject(id4))]))
              )
            ])
          )
        )
      );
      const tree2: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(
        SerializableTreeNode.ofValue(new MockTreeObject(id5), MutableAddress.ofSet(new Set([SerializableTreeNode.ofValue(new MockTreeObject(id6))])))
      );
      const tree3: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(SerializableTreeNode.ofValue(new MockTreeObject(id7)));

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress(MutableAddress.ofSet(new Set([tree1, tree2])));
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

  describe('toJSON', () => {
    it('returns ReadonlyArray<TreeNodeJSON>', () => {
      const id1: MockTreeID = new MockTreeID('tree id 1');
      const id2: MockTreeID = new MockTreeID('tree id 2');
      const id3: MockTreeID = new MockTreeID('tree id 3');
      const id4: MockTreeID = new MockTreeID('tree id 4');
      const id5: MockTreeID = new MockTreeID('tree id 5');
      const id6: MockTreeID = new MockTreeID('tree id 6');
      const id7: MockTreeID = new MockTreeID('tree id 7');

      const tree1: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(
        SerializableTreeNode.ofValue(
          new MockTreeObject(id1),
          MutableAddress.ofSet(
            new Set([
              SerializableTreeNode.ofValue(new MockTreeObject(id2)),
              SerializableTreeNode.ofValue(
                new MockTreeObject(id3),
                MutableAddress.ofSet(new Set([SerializableTreeNode.ofValue(new MockTreeObject(id4))]))
              )
            ])
          )
        )
      );
      const tree2: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(
        SerializableTreeNode.ofValue(new MockTreeObject(id5), MutableAddress.ofSet(new Set([SerializableTreeNode.ofValue(new MockTreeObject(id6))])))
      );
      const tree3: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(SerializableTreeNode.ofValue(new MockTreeObject(id7)));

      const trees: SerializableTrees<MockTreeObject<MockTreeID>> = SerializableTrees.ofAddress(MutableAddress.ofSet(new Set([tree1, tree2, tree3])));

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
