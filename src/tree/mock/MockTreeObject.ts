import { ValueObject } from '@jamashita/anden/object';
import type { Equatable, ObjectLiteral, Primitive } from '@jamashita/anden/type';
import type { SerializableTreeObject } from '../SerializableTreeObject.js';
import type { StructurableTreeObject } from '../StructurableTreeObject.js';
import type { TreeID } from '../TreeID.js';

export class MockTreeObject<out K extends TreeID> extends ValueObject implements StructurableTreeObject<K>, SerializableTreeObject {
  private readonly id: K;

  public constructor(id: K) {
    super();
    this.id = id;
  }

  protected getEquatableProperties(): Array<Equatable> {
    return [this.id];
  }

  protected getPrimitiveProperties(): Array<Primitive> {
    return [];
  }

  public getTreeID(): K {
    return this.id;
  }

  public serialize(): string {
    return this.id.toString();
  }

  public toJSON(): ObjectLiteral {
    return {
      id: this.id.get()
    };
  }
}
