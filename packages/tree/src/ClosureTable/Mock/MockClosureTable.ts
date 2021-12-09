import { Kind, Nullable } from '@jamashita/anden-type';
import { MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ImmutableProject, MutableProject } from '@jamashita/lluvia-project';
import { TreeID } from '../../TreeID';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTable<K extends TreeID> extends ClosureTable<K> {
  private static toProject<K extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>): ImmutableProject<K, ReadonlyAddress<K>> {
    const project: MutableProject<K, MutableAddress<K>> = MutableProject.empty<K, MutableAddress<K>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<K>) => {
      const offsprings: Nullable<MutableAddress<K>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty<K>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return ImmutableProject.of<K, ReadonlyAddress<K>>(project);
  }

  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    super(MockClosureTable.toProject(hierarchies));
  }
}
