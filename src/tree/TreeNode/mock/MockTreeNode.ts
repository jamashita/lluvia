import { type Address, MutableAddress, type ReadonlyAddress } from '../../../address/index.js';
import type { SerializableTreeObject } from '../../SerializableTreeObject.js';
import type { StructurableTreeObject } from '../../StructurableTreeObject.js';
import type { TreeID } from '../../TreeID.js';
import { ATreeNode } from '../ATreeNode.js';
import type { TreeNode } from '../TreeNode.js';

interface MockTreeObject<out K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTreeNode<out K extends TreeID, in out V extends MockTreeObject<K>> extends ATreeNode<V, MockTreeNode<K, V>> {
  public constructor(value: V, children: ReadonlyAddress<MockTreeNode<K, V>> = MutableAddress.empty()) {
    super(value, MutableAddress.of(children));
  }

  protected forge(node: TreeNode<V>): MockTreeNode<K, V> {
    if (node instanceof MockTreeNode) {
      return node as MockTreeNode<K, V>;
    }

    const children: Address<MockTreeNode<K, V>> = node.getChildren().map((t: TreeNode<V>) => {
      return this.forge(t);
    });

    return new MockTreeNode(node.getValue(), children);
  }
}
