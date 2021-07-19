import { MutableProject, ReadonlyProject } from '@jamashita/lluvia-project';
import { ATrees } from '../ATrees.js';
import { TreeID } from '../TreeID.js';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode.js';
import { MockTree } from './MockTree.js';
import { MockTreeObject } from './MockTreeObject.js';

export class MockTrees<K extends TreeID, V extends MockTreeObject<K>> extends ATrees<K, V, MockTreeNode<K, V>, MockTree<K, V>, MutableProject<K, MockTree<K, V>>, 'MockTrees'> {
  public readonly noun: 'MockTrees' = 'MockTrees';

  public constructor(trees: ReadonlyProject<K, MockTree<K, V>>) {
    super(MutableProject.of<K, MockTree<K, V>>(trees));
  }

  public add(tree: MockTree<K, V>): MockTrees<K, V> {
    this.trees.set(tree.getRoot().getValue().getTreeID(), tree);

    return this;
  }
}
