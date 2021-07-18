import { ATree } from '../ATree.js';
import { SerializableTreeObject } from '../SerializableTreeObject.js';
import { StructurableTreeObject } from '../StructurableTreeObject.js';
import { TreeID } from '../TreeID.js';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode.js';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTree<K extends TreeID, V extends MockTreeObject<K>> extends ATree<V, MockTreeNode<K, V>, 'MockTree'> {
  public readonly noun: 'MockTree' = 'MockTree';

  public constructor(root: MockTreeNode<K, V>) {
    super(root);
  }
}
