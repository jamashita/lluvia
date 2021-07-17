import { ReadonlyTrees } from './ReadonlyTrees.js';
import { Tree } from './Tree.js';

export interface Trees<K, V, E extends Tree<V>, N extends string = string> extends ReadonlyTrees<K, V, E, N> {
  add(tree: E): Trees<K, V, E>;
}
