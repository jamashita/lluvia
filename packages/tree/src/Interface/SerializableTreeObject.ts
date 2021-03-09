import { JSONable, Nominative } from '@jamashita/anden-type';

export interface SerializableTreeObject<N extends string = string> extends Nominative<N>, JSONable {
  // NOOP
}
