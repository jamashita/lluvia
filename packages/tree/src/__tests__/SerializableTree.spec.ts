import { MockTreeID } from '../mock/MockTreeID';
import { MockTreeObject } from '../mock/MockTreeObject';
import { SerializableTree } from '../SerializableTree';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode';

describe('SerializableTree', () => {
  describe('toJSON', () => {
    it('delegates its root instance', () => {
      const fn: jest.Mock = jest.fn();

      const root: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));

      root.toJSON = fn;

      const tree: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(root);

      tree.toJSON();

      expect(fn.mock.calls).toHaveLength(1);
    });
  });
});
