import { ReadonlyTrees } from './ReadonlyTrees';
import { Tree } from './Tree';

export interface Trees<out K, out V, E extends Tree<V>> extends ReadonlyTrees<K, V, E> {
  add(tree: E): Trees<K, V, E>;
}
