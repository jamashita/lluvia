import { Kind, Nullable } from '@jamashita/anden-type';
import { MutableAddress } from '@jamashita/lluvia-address';
import { MutableProject } from '@jamashita/lluvia-project';
import { TreeID } from '../../TreeID';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTable<K extends TreeID> extends ClosureTable<K> {
  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    const project: MutableProject<K, MutableAddress<K>> = MutableProject.empty();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<K>) => {
      const offsprings: Nullable<MutableAddress<K>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    super(project);
  }
}