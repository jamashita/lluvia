import { Objet } from '@jamashita/anden-object';
import { BinaryPredicate, ForEach, Kind, Nullable } from '@jamashita/anden-type';
import { Collection } from '@jamashita/lluvia-collection';
import { ATree } from './ATree';
import { ATreeNode } from './TreeNode';
import { Trees } from './Trees';

export abstract class ATrees<out K, out V, T extends ATreeNode<V, T>, E extends ATree<V, T>, C extends Collection<K, E>> extends Objet implements Trees<K, V, E> {
  protected readonly trees: C;

  protected constructor(trees: C) {
    super();
    this.trees = trees;
  }

  public abstract add(tree: E): ATrees<K, V, T, E, C>;

  public contains(value: V): boolean {
    return this.trees.some((tree: E) => {
      return tree.contains(value);
    });
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ATrees)) {
      return false;
    }

    return this.trees.equals(other.trees);
  }

  public every(predicate: BinaryPredicate<V, K>): boolean {
    return this.trees.every((tree: E, key: K) => {
      return tree.every((value: V) => {
        return predicate(value, key);
      });
    });
  }

  public find(predicate: BinaryPredicate<V, K>): Nullable<T> {
    for (const [k, v] of this.trees) {
      const node: Nullable<T> = v.find((value: V) => {
        return predicate(value, k);
      });

      if (!Kind.isNull(node)) {
        return node;
      }
    }

    return null;
  }

  public forEach(foreach: ForEach<K, V>): void {
    this.trees.forEach((tree: E, key: K) => {
      tree.forEach((value: V) => {
        foreach(value, key);
      });
    });
  }

  public get(key: K): Nullable<E> {
    return this.trees.get(key);
  }

  public isEmpty(): boolean {
    return this.trees.isEmpty();
  }

  public serialize(): string {
    return this.trees.toString();
  }

  public size(): number {
    return this.trees.size();
  }

  public some(predicate: BinaryPredicate<V, K>): boolean {
    return this.trees.some((tree: E, key: K) => {
      return tree.some((value: V) => {
        return predicate(value, key);
      });
    });
  }

  public values(): Iterable<V> {
    const values: Array<V> = [];

    this.trees.forEach((v: E) => {
      values.push(...v.values());
    });

    return values;
  }
}
