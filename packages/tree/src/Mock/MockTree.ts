import { ATree } from '../Abstract/ATree';
import { SerializableTreeObject } from '../Interface/SerializableTreeObject';
import { StructurableTreeObject } from '../Interface/StructurableTreeObject';
import { TreeID } from '../Interface/TreeID';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTree<K extends TreeID, V extends MockTreeObject<K>> extends ATree<V, MockTreeNode<K, V>, 'MockTree'> {
  public readonly noun: 'MockTree' = 'MockTree';

  public constructor(root: MockTreeNode<K, V>) {
    super(root);
  }
}
