import { ValueObject } from '@jamashita/anden/object';
import { Equatable, Primitive } from '@jamashita/anden/type';
import { TreeID } from '../TreeID.js';

export class MockTreeID extends ValueObject implements TreeID {
  private readonly id: string;

  public constructor(id: string) {
    super();
    this.id = id;
  }

  public get(): Primitive {
    return this.id;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [this.id];
  }

  public serialize(): string {
    return this.id;
  }
}
