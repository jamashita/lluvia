import { ImmutableSequence } from '../../../sequence/index.js';
import type { TreeID } from '../../TreeID.js';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies.js';
import type { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTableHierarchies<out K extends TreeID> extends ClosureTableHierarchies<K> {
  public constructor(...hierarchies: Array<ClosureTableHierarchy<K>>) {
    super(ImmutableSequence.ofArray(hierarchies));
  }
}
