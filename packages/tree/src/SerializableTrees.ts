import { JSONable } from '@jamashita/anden-type';
import { ImmutableAddress, MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ATrees } from './Abstract/ATrees.js';
import { SerializableTreeObject } from './Interface/SerializableTreeObject.js';
import { SerializableTree } from './SerializableTree.js';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode.js';

export class SerializableTrees<V extends SerializableTreeObject> extends ATrees<void, V, SerializableTreeNode<V>, SerializableTree<V>, MutableAddress<SerializableTree<V>>, 'SerializableTrees'>
  implements JSONable<ReadonlyArray<TreeNodeJSON>> {
  public readonly noun: 'SerializableTrees' = 'SerializableTrees';

  public static empty<VT extends SerializableTreeObject>(): SerializableTrees<VT> {
    return SerializableTrees.ofAddress<VT>(ImmutableAddress.empty<SerializableTree<VT>>());
  }

  public static of<VT extends SerializableTreeObject>(trees: SerializableTrees<VT>): SerializableTrees<VT> {
    return SerializableTrees.ofAddress<VT>(trees.trees);
  }

  public static ofAddress<VT extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<VT>>): SerializableTrees<VT> {
    return SerializableTrees.ofInternal<VT>(address);
  }

  private static ofInternal<VT extends SerializableTreeObject>(address: ReadonlyAddress<SerializableTree<VT>>): SerializableTrees<VT> {
    return new SerializableTrees<VT>(MutableAddress.of<SerializableTree<VT>>(address));
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
