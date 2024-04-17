import type { SpyInstance } from 'vitest';
import { MockTreeID } from '../mock/MockTreeID.js';
import { MockTreeObject } from '../mock/MockTreeObject.js';
import { SerializableTree } from '../SerializableTree.js';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode.js';

describe('SerializableTree', () => {
  describe('toJSON', () => {
    it('delegates its root instance', () => {
      const root: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock')));

      const spy: SpyInstance = vi.spyOn(root, 'toJSON');

      const tree: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of(root);

      tree.toJSON();

      expect(spy.mock.calls).toHaveLength(1);
    });
  });
});
