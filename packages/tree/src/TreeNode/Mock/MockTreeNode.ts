import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { SerializableTreeObject } from '../../SerializableTreeObject.js';
import { StructurableTreeObject } from '../../StructurableTreeObject.js';
import { TreeID } from '../../TreeID.js';
import { ATreeNode } from '../ATreeNode.js';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTreeNode<K extends TreeID, V extends MockTreeObject<K>> extends ATreeNode<V, MockTreeNode<K, V>, 'MockTreeNode'> {
  public readonly noun: 'MockTreeNode' = 'MockTreeNode';

  public constructor(value: V, children: ReadonlyAddress<MockTreeNode<K, V>> = ImmutableAddress.empty<MockTreeNode<K, V>>()) {
    super(value, ImmutableAddress.of<MockTreeNode<K, V>>(children));
  }

  public append(node: MockTreeNode<K, V>): MockTreeNode<K, V> {
    this.children = this.children.add(node);

    return this;
  }

  protected forge(node: ATreeNode<V, MockTreeNode<K, V>>): MockTreeNode<K, V> {
    return new MockTreeNode<K, V>(node.getValue(), node.getChildren());
  }
}
