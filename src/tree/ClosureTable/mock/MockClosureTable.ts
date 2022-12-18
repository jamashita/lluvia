import { Kind, Nullable } from '@jamashita/anden/type';
import { MutableAddress } from '../../../address/index.js';
import { MutableDictionary } from '../../../dictionary/index.js';
import { TreeID } from '../../TreeID.js';
import { ClosureTable } from '../ClosureTable.js';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTable<out K extends TreeID> extends ClosureTable<K> {
  public constructor(...hierarchies: Array<ClosureTableHierarchy<K>>) {
    const dictionary: MutableDictionary<K, MutableAddress<K>> = MutableDictionary.empty();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<K>) => {
      const offsprings: Nullable<MutableAddress<K>> = dictionary.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty();

        address.add(hierarchy.getOffspring());
        dictionary.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    super(dictionary);
  }
}
