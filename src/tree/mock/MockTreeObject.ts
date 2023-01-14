import { ValueObject } from '@jamashita/anden/object';
import { ObjectLiteral } from '@jamashita/anden/type';
import { SerializableTreeObject } from '../SerializableTreeObject.js';
import { StructurableTreeObject } from '../StructurableTreeObject.js';
import { TreeID } from '../TreeID.js';

export class MockTreeObject<out K extends TreeID> extends ValueObject implements StructurableTreeObject<K>, SerializableTreeObject {
  private readonly id: K;

  public constructor(id: K) {
    super();
    this.id = id;
  }

  public override equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof MockTreeObject)) {
      return false;
    }

    return this.id.equals(other.id);
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
