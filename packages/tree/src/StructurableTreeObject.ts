import { Nominative } from '@jamashita/anden-type';
import { TreeID } from './TreeID';

export interface StructurableTreeObject<K extends TreeID> extends Nominative {
  getTreeID(): K;
}
