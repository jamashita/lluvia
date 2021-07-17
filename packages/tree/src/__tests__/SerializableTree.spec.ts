import sinon, { SinonSpy } from 'sinon';
import { MockTreeID } from '../Mock/MockTreeID.js';
import { MockTreeObject } from '../Mock/MockTreeObject.js';
import { SerializableTree } from '../SerializableTree.js';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode.js';

describe('SerializableTree', () => {
  describe('toJSON', () => {
    it('delegates its root instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));

      root.toJSON = spy;

      const tree: SerializableTree<MockTreeObject<MockTreeID>> = SerializableTree.of<MockTreeObject<MockTreeID>>(root);

      tree.toJSON();

      expect(spy.called).toBe(true);
    });
  });
});
