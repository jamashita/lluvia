import { Objet } from '@jamashita/anden/object';
import { isEquatable, Kind, Nullable, Predicate } from '@jamashita/anden/type';
import { MutableAddress } from '../../address/index.js';
import { TreeNode } from './TreeNode.js';

export abstract class ATreeNode<out V, in out T extends ATreeNode<V, T>> extends Objet implements TreeNode<V> {
  protected readonly value: V;
  protected children: MutableAddress<T>;

  protected constructor(value: V, children: MutableAddress<T>) {
    super();
    this.value = value;
    this.children = children;
  }

  protected abstract forge(node: TreeNode<V>): T;

  public append(node: T): void {
    this.children.add(node);
  }

  public contains(value: V): boolean {
    if (this.valueEquals(value)) {
      return true;
    }

    return this.children.some((child: T) => {
      return child.contains(value);
    });
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ATreeNode)) {
      return false;
    }
    if (!this.valueEquals(other.value)) {
      return false;
    }

    return this.children.equals(other.children);
  }

  public find(predicate: Predicate<V>): Nullable<T> {
    if (predicate(this.value)) {
      return this.forge(this);
    }

    for (const v of this.children.values()) {
      const n: Nullable<T> = v.find(predicate);

      if (!Kind.isNull(n)) {
        return n;
      }
    }

    return null;
  }

  public getChildren(): MutableAddress<T> {
    return this.children;
  }

  public getValue(): V {
    return this.value;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }

  public serialize(): string {
    if (this.isLeaf()) {
      return `{VALUE: ${Objet.identify(this.value)}}`;
    }

    return `{VALUE: ${Objet.identify(this.value)}, CHILDREN: [${this.children.toString()}]}`;
  }

  public size(): number {
    if (this.isLeaf()) {
      return 1;
    }

    let size: number = 1;

    this.children.forEach((child: T) => {
      size += child.size();
    });

    return size;
  }

  private valueEquals(other: unknown): boolean {
    if (this.value === other) {
      return true;
    }
    if (isEquatable(this.value)) {
      return this.value.equals(other);
    }

    return false;
  }

  public values(): Iterable<V> {
    if (this.isLeaf()) {
      return [this.value];
    }

    const values: Array<V> = [];

    this.valuesInternal(values);

    return values;
  }

  private valuesInternal(values: Array<V>): void {
    values.push(this.value);

    this.children.forEach((child: T) => {
      child.valuesInternal(values);
    });
  }
}
