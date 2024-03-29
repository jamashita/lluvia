import { Nominative } from '@jamashita/anden/type';
import { TreeID } from './TreeID.js';

export interface StructurableTreeObject<out K extends TreeID> extends Nominative {
  getTreeID(): K;
}
