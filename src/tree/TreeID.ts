import type { Nominative, Primitive } from '@jamashita/anden/type';

export interface TreeID extends Nominative {
  get(): Primitive;
}
