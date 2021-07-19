import { Nominative, Primitive } from '@jamashita/anden-type';

export interface TreeID<N extends string = string> extends Nominative<N> {
  get(): Primitive;
}
