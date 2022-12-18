import { TreeID } from '../../TreeID';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<out K extends TreeID> extends ClosureTableHierarchy<K> {
  public constructor(ancestor: K, offspring: K) {
    super(ancestor, offspring);
  }
}
