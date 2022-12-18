import { ATree } from '../ATree.js';
import { SerializableTreeObject } from '../SerializableTreeObject.js';
import { StructurableTreeObject } from '../StructurableTreeObject.js';
import { TreeID } from '../TreeID.js';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode.js';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTree<out K extends TreeID, in out V extends MockTreeObject<K>> extends ATree<V, MockTreeNode<K, V>> {
  public constructor(root: MockTreeNode<K, V>) {
    super(root);
  }
}
