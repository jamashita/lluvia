import { ATree } from '../ATree.js';
import type { SerializableTreeObject } from '../SerializableTreeObject.js';
import type { StructurableTreeObject } from '../StructurableTreeObject.js';
import type { TreeID } from '../TreeID.js';
import type { MockTreeNode } from '../TreeNode/mock/MockTreeNode.js';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTree<out K extends TreeID, in out V extends MockTreeObject<K>> extends ATree<V, MockTreeNode<K, V>> {
  // NOOP
}
