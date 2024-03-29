import { TreeID } from '../../TreeID.js';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTableHierarchy<out K extends TreeID> extends ClosureTableHierarchy<K> {
  public constructor(ancestor: K, offspring: K) {
    super(ancestor, offspring);
  }
}
