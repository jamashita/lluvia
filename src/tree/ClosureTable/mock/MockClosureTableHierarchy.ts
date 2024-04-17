import type { TreeID } from '../../TreeID.js';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTableHierarchy<out K extends TreeID> extends ClosureTableHierarchy<K> {
  // NOOP
}
