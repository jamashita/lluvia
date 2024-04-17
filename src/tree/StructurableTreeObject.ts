import type { Nominative } from '@jamashita/anden/type';
import type { TreeID } from './TreeID.js';

export interface StructurableTreeObject<out K extends TreeID> extends Nominative {
  getTreeID(): K;
}
