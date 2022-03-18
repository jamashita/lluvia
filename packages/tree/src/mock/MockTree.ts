import { ATree } from '../ATree';
import { SerializableTreeObject } from '../SerializableTreeObject';
import { StructurableTreeObject } from '../StructurableTreeObject';
import { TreeID } from '../TreeID';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTree<K extends TreeID, V extends MockTreeObject<K>> extends ATree<V, MockTreeNode<K, V>> {
  public constructor(root: MockTreeNode<K, V>) {
    super(root);
  }
}
