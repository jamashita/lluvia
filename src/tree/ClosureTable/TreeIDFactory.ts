import type { Primitive } from '@jamashita/anden/type';
import type { TreeID } from '../TreeID.js';

export interface TreeIDFactory<out K extends TreeID> {
  forge(id: Primitive): K;
}
