import { ValueObject } from '@jamashita/anden/object';
import { Primitive } from '@jamashita/anden/type';
import { TreeID } from '../TreeID.js';

export class MockTreeID extends ValueObject implements TreeID {
  private readonly id: string;

  public constructor(id: string) {
    super();
    this.id = id;
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof MockTreeID)) {
      return false;
    }

    return this.id === other.id;
  }

  public get(): Primitive {
    return this.id;
  }

  public serialize(): string {
    return this.id;
  }
}
