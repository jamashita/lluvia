import { ATree } from '../Abstract/ATree.js';
import { SerializableTreeObject } from '../Interface/SerializableTreeObject.js';
import { StructurableTreeObject } from '../Interface/StructurableTreeObject.js';
import { TreeID } from '../Interface/TreeID.js';
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
