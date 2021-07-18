import { Nominative, Nullable, Predicate } from '@jamashita/anden-type';
import { ImmutableAddress } from '@jamashita/lluvia-address';

export interface ReadonlyTreeNode<V, N extends string = string> extends Nominative<N> {
  contains(value: V): boolean;

  find(predicate: Predicate<V>): Nullable<ReadonlyTreeNode<V>>;

  getChildren(): ImmutableAddress<ReadonlyTreeNode<V>>;

  getValue(): V;

  isLeaf(): boolean;

  size(): number;

  values(): Iterable<V>;
}
