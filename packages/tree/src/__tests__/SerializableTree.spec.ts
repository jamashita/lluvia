import sinon, { SinonSpy } from 'sinon';
import { MockTreeID } from '../Mock/MockTreeID';
import { MockTreeObject } from '../Mock/MockTreeObject';
import { SerializableTree } from '../SerializableTree';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode';

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
