import { JSONable } from '@jamashita/anden-type';
import { ImmutableAddress, MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ATrees } from './ATrees';
import { SerializableTree } from './SerializableTree';
import { SerializableTreeObject } from './SerializableTreeObject';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode';

export class SerializableTrees<V extends SerializableTreeObject> extends ATrees<void, V, SerializableTreeNode<V>, SerializableTree<V>, MutableAddress<SerializableTree<V>>> implements JSONable<ReadonlyArray<TreeNodeJSON>> {
  public static empty<V extends SerializableTreeObject>(): SerializableTrees<V> {
    return SerializableTrees.ofAddress<V>(ImmutableAddress.empty<SerializableTree<V>>());
  }

  public static of<V extends SerializableTreeObject>(trees: SerializableTrees<V>): SerializableTrees<V> {
    return SerializableTrees.ofAddress<V>(trees.trees);
  }

  public static ofAddress<V extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<V>>): SerializableTrees<V> {
    return SerializableTrees.ofInternal<V>(address);
  }

  private static ofInternal<V extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<V>>): SerializableTrees<V> {
    return new SerializableTrees<V>(MutableAddress.of<SerializableTree<V>>(address));
  }

  protected constructor(trees: MutableAddress<SerializableTree<V>>) {
    super(trees);
  }

  public add(tree: SerializableTree<V>): SerializableTrees<V> {
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
