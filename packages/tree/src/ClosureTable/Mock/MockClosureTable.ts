import { Kind, Nullable } from '@jamashita/anden-type';
import { MutableAddress, ReadonlyAddress } from '@jamashita/lluvia-address';
import { ImmutableProject, MutableProject } from '@jamashita/lluvia-project';
import { TreeID } from '../../Interface/TreeID.js';
import { ClosureTable } from '../ClosureTable.js';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTable<K extends TreeID> extends ClosureTable<K> {
  private static toProject<KT extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ImmutableProject<KT, ReadonlyAddress<KT>> {
    const project: MutableProject<KT, MutableAddress<KT>> = MutableProject.empty<KT, MutableAddress<KT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<KT>) => {
      const offsprings: Nullable<MutableAddress<KT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<KT> = MutableAddress.empty<KT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return ImmutableProject.of<KT, ReadonlyAddress<KT>>(project);
  }

  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    super(MockClosureTable.toProject(hierarchies));
  }
}
