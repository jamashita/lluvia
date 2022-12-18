import { MutableDictionary, ReadonlyDictionary } from '@jamashita/lluvia-dictionary';
import { ATrees } from '../ATrees';
import { TreeID } from '../TreeID';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode';
import { MockTree } from './MockTree';
import { MockTreeObject } from './MockTreeObject';

export class MockTrees<out K extends TreeID, in out V extends MockTreeObject<K>> extends ATrees<K, V, MockTreeNode<K, V>, MockTree<K, V>, MutableDictionary<K, MockTree<K, V>>> {
  public constructor(trees: ReadonlyDictionary<K, MockTree<K, V>>) {
    super(MutableDictionary.of(trees));
  }

  public add(tree: MockTree<K, V>): this {
    this.trees.set(tree.getRoot().getValue().getTreeID(), tree);

    return this;
  }
}
