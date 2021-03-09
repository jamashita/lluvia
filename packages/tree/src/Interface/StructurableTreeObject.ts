import { Nominative } from '@jamashita/anden-type';
import { TreeID } from './TreeID';

export interface StructurableTreeObject<K extends TreeID, N extends string = string> extends Nominative<N> {
  getTreeID(): K;
}
