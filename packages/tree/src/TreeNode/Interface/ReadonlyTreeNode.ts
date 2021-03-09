import { Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { ImmutableAddress } from '@jamashita/lluvia-collection';

export interface ReadonlyTreeNode<V, N extends string = string> extends Nominative<N> {
  getValue(): V;

  getChildren(): ImmutableAddress<ReadonlyTreeNode<V>>;

  isLeaf(): boolean;

  contains(value: V): boolean;

  size(): number;

  find(predicate: Predicate<V>): Nullable<ReadonlyTreeNode<V>>;

  values(): Iterable<V>;
}
