import { Objet } from '@jamashita/anden-object';
import { Enumerator, Nullable, Predicate } from '@jamashita/anden-type';
import { Tree } from '../Interface/Tree';
import { ATreeNode } from '../TreeNode/Abstract/ATreeNode';

export abstract class ATree<V, T extends ATreeNode<V, T>, N extends string = string> extends Objet<N> implements Tree<V, N> {
  protected readonly root: T;

  protected constructor(root: T) {
    super();
    this.root = root;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ATree)) {
      return false;
    }

    return this.root.equals(other.root);
  }

  public serialize(): string {
    return this.root.toString();
  }

  public getRoot(): T {
    return this.root;
  }

  public contains(value: V): boolean {
    return this.root.contains(value);
  }

  public find(predicate: Predicate<V>): Nullable<T> {
    return this.root.find(predicate);
  }

  public size(): number {
    return this.root.size();
  }

  public values(): Iterable<V> {
    return this.root.values();
  }

  public every(predicate: Predicate<V>): boolean {
    return this.everyInternal(this.root, predicate);
  }

  public some(predicate: Predicate<V>): boolean {
    return this.someInternal(this.root, predicate);
  }

  // TODO VISITOR PATTERN!
  public forEach(enumerator: Enumerator<unknown, V>): void {
    for (const value of this.values()) {
      enumerator(value, null);
    }
  }

  private everyInternal(node: T, predicate: Predicate<V>): boolean {
    if (!predicate(node.getValue())) {
      return false;
    }
    if (node.isLeaf()) {
      return true;
    }

    return node.getChildren().every((child: T) => {
      return this.everyInternal(child, predicate);
    });
  }

  private someInternal(node: T, predicate: Predicate<V>): boolean {
    if (predicate(node.getValue())) {
      return true;
    }
    if (node.isLeaf()) {
      return false;
    }

    return node.getChildren().some((n: T) => {
      return this.someInternal(n, predicate);
    });
  }
}
