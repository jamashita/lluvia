import { ImmutableSequence } from '@jamashita/lluvia-sequence';
import { TreeID } from '../../TreeID';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchies<out K extends TreeID> extends ClosureTableHierarchies<K> {
  public constructor(...hierarchies: Array<ClosureTableHierarchy<K>>) {
    super(ImmutableSequence.ofArray(hierarchies));
  }
}
