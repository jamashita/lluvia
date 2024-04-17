import type { JSONifiable } from '@jamashita/anden/type';
import { ImmutableAddress, MutableAddress, type ReadonlyAddress } from '../address/index.js';
import { ATrees } from './ATrees.js';
import type { SerializableTree } from './SerializableTree.js';
import type { SerializableTreeObject } from './SerializableTreeObject.js';
import type { SerializableTreeNode, TreeNodeJSON } from './TreeNode/index.js';

export class SerializableTrees<out V extends SerializableTreeObject>
  extends ATrees<void, V, SerializableTreeNode<V>, SerializableTree<V>, MutableAddress<SerializableTree<V>>>
  implements JSONifiable<ReadonlyArray<TreeNodeJSON>>
{
  public static empty<V extends SerializableTreeObject>(): SerializableTrees<V> {
    return SerializableTrees.ofAddress(ImmutableAddress.empty());
  }

  public static of<V extends SerializableTreeObject>(trees: SerializableTrees<V>): SerializableTrees<V> {
    return SerializableTrees.ofAddress(trees.trees);
  }

  public static ofAddress<V extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<V>>): SerializableTrees<V> {
    return SerializableTrees.ofInternal(address);
  }

  private static ofInternal<V extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<V>>): SerializableTrees<V> {
    return new SerializableTrees(MutableAddress.of(address));
  }

  protected constructor(trees: MutableAddress<SerializableTree<V>>) {
    super(trees);
  }

  public add(tree: SerializableTree<V>): this {
    this.trees.add(tree);

    return this;
  }

  public toJSON(): ReadonlyArray<TreeNodeJSON> {
    const json: Array<TreeNodeJSON> = [];

    for (const [, tree] of this.trees) {
      json.push(tree.toJSON());
    }

    return json;
  }
}
