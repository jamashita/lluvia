import { ValueObject } from '@jamashita/anden-object';
import { ObjectLiteral } from '@jamashita/anden-type';
import { SerializableTreeObject } from '../Interface/SerializableTreeObject';
import { StructurableTreeObject } from '../Interface/StructurableTreeObject';
import { TreeID } from '../Interface/TreeID';

export class MockTreeObject<K extends TreeID> extends ValueObject<'MockTreeObject'> implements StructurableTreeObject<K, 'MockTreeObject'>, SerializableTreeObject<'MockTreeObject'> {
  public readonly noun: 'MockTreeObject' = 'MockTreeObject';
  private readonly id: K;

  public constructor(id: K) {
    super();
    this.id = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof MockTreeObject)) {
      return false;
    }

    return this.id.equals(other.id);
  }

  public serialize(): string {
    return this.id.toString();
  }

  public getTreeID(): K {
    return this.id;
  }

  public toJSON(): ObjectLiteral {
    return {
      id: this.id.get()
    };
  }
}
