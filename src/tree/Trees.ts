import { ReadonlyTrees } from './ReadonlyTrees.js';
import { Tree } from './Tree.js';

export interface Trees<out K, out V, E extends Tree<V>> extends ReadonlyTrees<K, V, E> {
  add(tree: E): Trees<K, V, E>;
}
