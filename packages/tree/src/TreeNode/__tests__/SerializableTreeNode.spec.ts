import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/lluvia-address';
import { MockTreeID } from '../../mock/MockTreeID';
import { MockTreeObject } from '../../mock/MockTreeObject';
import { SerializableTreeNode } from '../SerializableTreeNode';

describe('SerializableTreeNode', () => {
  describe('of', () => {
    it('copies shallowly', () => {
      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.of(node01);

      expect(node01.getValue().equals(node02.getValue())).toBe(true);
      expect(node01.getChildren().equals(node02.getChildren())).toBe(true);
    });
  });

  describe('ofValue', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 1')), MutableAddress.empty());
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 1')), new MockAddress(new Set()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<MockTreeObject<MockTreeID>>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<MockTreeObject<MockTreeID>>>());
    });
  });

  describe('append', () => {
    it('appends a node into its children', () => {
      const id1: MockTreeID = new MockTreeID('mock 1');
      const id2: MockTreeID = new MockTreeID('mock 2');
      const id3: MockTreeID = new MockTreeID('mock 3');
      const id4: MockTreeID = new MockTreeID('mock 4');

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(id1),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(id2))
          ])
        )
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(id3),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(id4))
          ])
        )
      );

      node01.append(node02);

      expect(node01.size()).toBe(4);

      const children: ImmutableAddress<SerializableTreeNode<MockTreeObject<MockTreeID>>> = node01.getChildren();
      let i: number = 0;

      expect(children.size()).toBe(2);

      children.forEach((child: SerializableTreeNode<MockTreeObject<MockTreeID>>) => {
        switch (i) {
          case 0: {
            expect(child.getValue().getTreeID()).toBe(id2);
            expect(child.isLeaf()).toBe(true);
            break;
          }
          case 1: {
            expect(child.getValue().getTreeID()).toBe(id3);
            expect(child.isLeaf()).toBe(false);
            break;
          }
          default: {
            fail();
          }
        }

        i++;
      });
    });

    it('can append a node into the node which do have no children', () => {
      const id1: MockTreeID = new MockTreeID('mock 1');
      const id3: MockTreeID = new MockTreeID('mock 3');
      const id4: MockTreeID = new MockTreeID('mock 4');

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(id1)
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(id3),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(id4))
          ])
        )
      );

      node01.append(node02);

      expect(node01.size()).toBe(3);

      const children: ImmutableAddress<SerializableTreeNode<MockTreeObject<MockTreeID>>> = node01.getChildren();
      let i: number = 0;

      expect(children.size()).toBe(1);

      children.forEach((child: SerializableTreeNode<MockTreeObject<MockTreeID>>) => {
        switch (i) {
          case 0: {
            expect(child.getValue().getTreeID()).toBe(id3);
            expect(child.isLeaf()).toBe(false);
            break;
          }
          default: {
            fail();
          }
        }

        i++;
      });
    });
  });

  describe('find', () => {
    it('returns the value itself when the TreeNode value matches', () => {
      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet(
                new Set([
                  SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.find((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().equals(new MockTreeID('mock 1'));
      })?.getValue().getTreeID().equals(new MockTreeID('mock 1'))).toBe(true);
    });

    it('returns children\'s value when the TreeNode\'s children value matches', () => {
      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet(
                new Set([
                  SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.find((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().equals(new MockTreeID('mock 2'));
      })?.getValue().getTreeID().equals(new MockTreeID('mock 2'))).toBe(true);
      expect(node.find((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().equals(new MockTreeID('mock 3'));
      })?.getValue().getTreeID().equals(new MockTreeID('mock 3'))).toBe(true);
    });

    it('returns null when the TreeNode does not have such value', () => {
      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet(
          new Set([
            SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet(
                new Set([
                  SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.find((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().equals(new MockTreeID('mock 4'));
      })).toBeNull();
    });
  });

  describe('toJSON', () => {
    it('returns SerializableTreeNodeJSON', () => {
      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet(new Set([
          SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 2')),
            ImmutableAddress.ofSet(new Set([
              SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 3')))
            ]))),
          SerializableTreeNode.ofValue(new MockTreeObject(new MockTreeID('mock 4')))
        ]))
      );

      expect(node.toJSON()).toStrictEqual({
        value: {
          id: 'mock 1'
        },
        children: [
          {
            value: {
              id: 'mock 2'
            },
            children: [
              {
                value: {
                  id: 'mock 3'
                },
                children: []
              }
            ]
          },
          {
            value: {
              id: 'mock 4'
            },
            children: []
          }
        ]
      });
    });
  });
});
