import { ImmutableSequence } from '@jamashita/lluvia-sequence';
import { TreeID } from '../../TreeID.js';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies.js';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTableHierarchies<K extends TreeID> extends ClosureTableHierarchies<K> {
  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    super(ImmutableSequence.ofArray<ClosureTableHierarchy<K>>(hierarchies));
  }
}
