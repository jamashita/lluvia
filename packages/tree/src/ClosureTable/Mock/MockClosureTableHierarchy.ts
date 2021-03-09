import { TreeID } from '../../Interface/TreeID';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<K extends TreeID> extends ClosureTableHierarchy<K> {
  public constructor(ancestor: K, offspring: K) {
    super(ancestor, offspring);
  }
}
