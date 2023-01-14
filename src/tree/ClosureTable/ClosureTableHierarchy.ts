import { ValueObject } from '@jamashita/anden/object';
import { JSONifiable, Primitive } from '@jamashita/anden/type';
import { TreeID } from '../TreeID.js';
import { TreeIDFactory } from './TreeIDFactory.js';

export type ClosureTableJSON = Readonly<{
  ancestor: Primitive;
  offspring: Primitive;
}>;

export class ClosureTableHierarchy<out K extends TreeID> extends ValueObject implements JSONifiable<ClosureTableJSON> {
  private readonly ancestor: K;
  private readonly offspring: K;

  public static of<K extends TreeID>(ancestor: K, offspring: K): ClosureTableHierarchy<K> {
    return new ClosureTableHierarchy(ancestor, offspring);
  }

  public static ofJSON<K extends TreeID>(json: ClosureTableJSON, factory: TreeIDFactory<K>): ClosureTableHierarchy<K> {
    const ancestor: K = factory.forge(json.ancestor);
    const offspring: K = factory.forge(json.offspring);

    return ClosureTableHierarchy.of(ancestor, offspring);
  }

  protected constructor(ancestor: K, offspring: K) {
    super();
    this.ancestor = ancestor;
    this.offspring = offspring;
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTableHierarchy)) {
      return false;
    }
    if (!this.ancestor.equals(other.ancestor)) {
      return false;
    }
    if (!this.offspring.equals(other.offspring)) {
      return false;
    }

    return true;
  }

  public getAncestor(): K {
    return this.ancestor;
  }

  public getOffspring(): K {
    return this.offspring;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.ancestor.toString());
    properties.push(this.offspring.toString());

    return properties.join(', ');
  }

  public toJSON(): ClosureTableJSON {
    return {
      ancestor: this.ancestor.get(),
      offspring: this.offspring.get()
    };
  }
}
