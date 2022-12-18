import { MutableDictionary, ReadonlyDictionary } from '../../dictionary/index.js';
import { ATrees } from '../ATrees.js';
import { TreeID } from '../TreeID.js';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode.js';
import { MockTree } from './MockTree.js';
import { MockTreeObject } from './MockTreeObject.js';

export class MockTrees<out K extends TreeID, in out V extends MockTreeObject<K>> extends ATrees<K, V, MockTreeNode<K, V>, MockTree<K, V>, MutableDictionary<K, MockTree<K, V>>> {
  public constructor(trees: ReadonlyDictionary<K, MockTree<K, V>>) {
    super(MutableDictionary.of(trees));
  }

  public add(tree: MockTree<K, V>): this {
    this.trees.set(tree.getRoot().getValue().getTreeID(), tree);

    return this;
  }
}
