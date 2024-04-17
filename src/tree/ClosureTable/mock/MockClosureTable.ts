import { Kind, type Nullable } from '@jamashita/anden/type';
import { MutableAddress } from '../../../address/index.js';
import { MutableDictionary } from '../../../dictionary/index.js';
import type { TreeID } from '../../TreeID.js';
import { ClosureTable } from '../ClosureTable.js';
import type { ClosureTableHierarchy } from '../ClosureTableHierarchy.js';

export class MockClosureTable<out K extends TreeID> extends ClosureTable<K> {
  public constructor(...hierarchies: Array<ClosureTableHierarchy<K>>) {
    const dictionary: MutableDictionary<K, MutableAddress<K>> = MutableDictionary.empty();

    for (const hierarchy of hierarchies) {
      const offsprings: Nullable<MutableAddress<K>> = dictionary.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<K> = MutableAddress.empty();

        address.add(hierarchy.getOffspring());
        dictionary.set(hierarchy.getAncestor(), address);

        continue;
      }

      offsprings.add(hierarchy.getOffspring());
    }

    super(dictionary);
  }
}
