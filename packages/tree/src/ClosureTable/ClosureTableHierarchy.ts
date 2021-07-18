import { ValueObject } from '@jamashita/anden-object';
import { JSONable, Primitive } from '@jamashita/anden-type';
import { TreeID } from '../TreeID.js';
import { TreeIDFactory } from './TreeIDFactory.js';

export type ClosureTableJSON = Readonly<{
  ancestor: Primitive;
  offspring: Primitive;
}>;

export class ClosureTableHierarchy<K extends TreeID> extends ValueObject<'ClosureTableHierarchy'>
  implements JSONable<ClosureTableJSON> {
  public readonly noun: 'ClosureTableHierarchy' = 'ClosureTableHierarchy';
  private readonly ancestor: K;
  private readonly offspring: K;

  public static of<KT extends TreeID>(ancestor: KT, offspring: KT): ClosureTableHierarchy<KT> {
    return new ClosureTableHierarchy<KT>(ancestor, offspring);
  }

  public static ofJSON<KT extends TreeID>(json: ClosureTableJSON, factory: TreeIDFactory<KT>): ClosureTableHierarchy<KT> {
    const ancestor: KT = factory.forge(json.ancestor);
    const offspring: KT = factory.forge(json.offspring);

    return ClosureTableHierarchy.of<KT>(ancestor, offspring);
  }

  protected constructor(ancestor: K, offspring: K) {
    super();
    this.ancestor = ancestor;
    this.offspring = offspring;
  }

  public equals(other: unknown): boolean {
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

  public getAncestor(): K {
    return this.ancestor;
  }

  public getOffspring(): K {
    return this.offspring;
  }
}
