import { ReadonlyTrees } from './ReadonlyTrees';
import { Tree } from './Tree';

export interface Trees<K, V, E extends Tree<V>> extends ReadonlyTrees<K, V, E> {
  add(tree: E): Trees<K, V, E>;
}
