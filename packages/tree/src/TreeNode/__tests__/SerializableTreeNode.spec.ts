import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/lluvia-collection';
import { MockTreeID } from '../../Mock/MockTreeID.js';
import { MockTreeObject } from '../../Mock/MockTreeObject.js';
import { SerializableTreeNode } from '../SerializableTreeNode.js';

describe('SerializableTreeNode', () => {
  describe('of', () => {
    it('copies shallowly', () => {
      expect.assertions(2);

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.of<MockTreeObject<MockTreeID>>(node01);

      expect(node01.getValue().equals(node02.getValue())).toBe(true);
      expect(node01.getChildren().equals(node02.getChildren())).toBe(true);
    });
  });

  describe('ofValue', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')), MutableAddress.empty<SerializableTreeNode<MockTreeObject<MockTreeID>>>());
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')), new MockAddress<SerializableTreeNode<MockTreeObject<MockTreeID>>>(new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<MockTreeObject<MockTreeID>>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<MockTreeObject<MockTreeID>>>());
    });
  });

  describe('append', () => {
    it('appends a node into its children', () => {
      expect.assertions(6);

      const id1: MockTreeID = new MockTreeID('mock 1');
      const id2: MockTreeID = new MockTreeID('mock 2');
      const id3: MockTreeID = new MockTreeID('mock 3');
      const id4: MockTreeID = new MockTreeID('mock 4');

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(id1),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(id2))
          ])
        )
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(id3),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(id4))
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
      expect.assertions(4);

      const id1: MockTreeID = new MockTreeID('mock 1');
      const id3: MockTreeID = new MockTreeID('mock 3');
      const id4: MockTreeID = new MockTreeID('mock 4');

      const node01: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(id1)
      );
      const node02: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(id3),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(id4))
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
      expect.assertions(1);

      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
                new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
                  SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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
      expect.assertions(2);

      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
                new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
                  SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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
      expect.assertions(1);

      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
          new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
            SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(
                new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
                  SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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
      expect.assertions(1);

      const node: SerializableTreeNode<MockTreeObject<MockTreeID>> = SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
          SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
            ImmutableAddress.ofSet<SerializableTreeNode<MockTreeObject<MockTreeID>>>(new Set<SerializableTreeNode<MockTreeObject<MockTreeID>>>([
              SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
            ]))),
          SerializableTreeNode.ofValue<MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 4')))
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
