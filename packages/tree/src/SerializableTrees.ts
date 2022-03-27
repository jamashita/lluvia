import { JSONable } from '@jamashita/anden-type';
import { ImmutableAddress, MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ATrees } from './ATrees';
import { SerializableTree } from './SerializableTree';
import { SerializableTreeObject } from './SerializableTreeObject';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode';

export class SerializableTrees<V extends SerializableTreeObject> extends ATrees<void, V, SerializableTreeNode<V>, SerializableTree<V>, MutableAddress<SerializableTree<V>>> implements JSONable<ReadonlyArray<TreeNodeJSON>> {
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

    this.trees.forEach((tree: SerializableTree<V>) => {
      json.push(tree.toJSON());
    });

    return json;
  }
}
