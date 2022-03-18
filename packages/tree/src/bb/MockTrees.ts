import { MutableProject, ReadonlyProject } from '@jamashita/lluvia-project';
import { ATrees } from '../ATrees';
import { TreeID } from '../TreeID';
import { MockTreeNode } from '../TreeNode/bb/MockTreeNode';
import { MockTree } from './MockTree';
import { MockTreeObject } from './MockTreeObject';

export class MockTrees<K extends TreeID, V extends MockTreeObject<K>> extends ATrees<K, V, MockTreeNode<K, V>, MockTree<K, V>, MutableProject<K, MockTree<K, V>>> {
  public constructor(trees: ReadonlyProject<K, MockTree<K, V>>) {
    super(MutableProject.of<K, MockTree<K, V>>(trees));
  }

  public add(tree: MockTree<K, V>): this {
    this.trees.set(tree.getRoot().getValue().getTreeID(), tree);

    return this;
  }
}
