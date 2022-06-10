import { Objet } from '@jamashita/anden-object';
import { ForEach, Nullable, Predicate } from '@jamashita/anden-type';
import { Tree } from './Tree';
import { ATreeNode } from './TreeNode';

export abstract class ATree<out V, in out T extends ATreeNode<V, T>> extends Objet implements Tree<V> {
  protected readonly root: T;

  protected constructor(root: T) {
    super();
    this.root = root;
  }

  public contains(value: V): boolean {
    return this.root.contains(value);
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

  public every(predicate: Predicate<V>): boolean {
    return this.everyInternal(this.root, predicate);
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

  public find(predicate: Predicate<V>): Nullable<T> {
    return this.root.find(predicate);
  }

  // TODO VISITOR PATTERN!
  public forEach(foreach: ForEach<unknown, V>): void {
    for (const value of this.values()) {
      foreach(value, null);
    }
  }

  public getRoot(): T {
    return this.root;
  }

  public serialize(): string {
    return this.root.toString();
  }

  public size(): number {
    return this.root.size();
  }

  public some(predicate: Predicate<V>): boolean {
    return this.someInternal(this.root, predicate);
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

  public values(): Iterable<V> {
    return this.root.values();
  }
}
