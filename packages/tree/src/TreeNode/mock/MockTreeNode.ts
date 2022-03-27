import { ImmutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { SerializableTreeObject } from '../../SerializableTreeObject';
import { StructurableTreeObject } from '../../StructurableTreeObject';
import { TreeID } from '../../TreeID';
import { ATreeNode } from '../ATreeNode';

interface MockTreeObject<K extends TreeID> extends StructurableTreeObject<K>, SerializableTreeObject {
  // NOOP
}

export class MockTreeNode<K extends TreeID, V extends MockTreeObject<K>> extends ATreeNode<V, MockTreeNode<K, V>> {
  public constructor(value: V, children: ReadonlyAddress<MockTreeNode<K, V>> = ImmutableAddress.empty()) {
    super(value, ImmutableAddress.of(children));
  }

  public append(node: MockTreeNode<K, V>): this {
    this.children = this.children.add(node);

    return this;
  }

  protected forge(node: ATreeNode<V, MockTreeNode<K, V>>): MockTreeNode<K, V> {
    return new MockTreeNode(node.getValue(), node.getChildren());
  }
}
