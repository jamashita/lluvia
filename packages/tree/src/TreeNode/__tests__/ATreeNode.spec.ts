import { ImmutableAddress } from '@jamashita/lluvia-address';
import { MockTreeID } from '../../bb/MockTreeID';
import { MockTreeObject } from '../../bb/MockTreeObject';
import { MockTreeNode } from '../bb/MockTreeNode';

describe('ATreeNode', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const node01: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));
      const node02: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));

      expect(node.equals(new MockTreeObject(new MockTreeID('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      const node01: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));
      const node02: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')));
      const node03: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));
      const node04: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );
      const node05: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 3')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );
      const node06: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 4')))
          ])
        )
      );
      const node07: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2'))),
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
          ])
        )
      );
      const node08: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );

      expect(node01.equals(node02)).toBe(false);
      expect(node01.equals(node03)).toBe(true);
      expect(node01.equals(node04)).toBe(false);
      expect(node01.equals(node05)).toBe(false);
      expect(node01.equals(node06)).toBe(false);
      expect(node01.equals(node07)).toBe(false);
      expect(node01.equals(node08)).toBe(false);
      expect(node04.equals(node05)).toBe(false);
      expect(node04.equals(node06)).toBe(false);
      expect(node04.equals(node07)).toBe(false);
      expect(node04.equals(node08)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns JSON-like string', () => {
      const node01: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));
      const node02: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );
      const node03: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
            ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
            ])))
        ]))
      );

      expect(node01.toString()).toBe('{VALUE: mock 1}');
      expect(node02.toString()).toBe('{VALUE: mock 1, CHILDREN: [{VALUE: mock 2}]}');
      expect(node03.toString()).toBe('{VALUE: mock 1, CHILDREN: [{VALUE: mock 2, CHILDREN: [{VALUE: mock 3}]}]}');
    });
  });
  describe('isLeaf', () => {
    it('returns false if it owns children', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')));

      expect(node.isLeaf()).toBe(true);
    });
  });

  describe('contains', () => {
    it('returns true if TreeNode itself has the value', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.contains(new MockTreeObject<MockTreeID>(new MockTreeID('mock 1')))).toBe(true);
    });

    it('returns true if TreeNode\'s children have the value', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.contains(new MockTreeObject<MockTreeID>(new MockTreeID('mock 2')))).toBe(true);
      expect(node.contains(new MockTreeObject<MockTreeID>(new MockTreeID('mock 3')))).toBe(true);
    });

    it('returns true if TreeNode does not contain such value', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.contains(new MockTreeObject<MockTreeID>(new MockTreeID('mock 4')))).toBe(false);
    });
  });

  describe('size', () => {
    it('returns 1 when the TreeNode does not have children', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1'))
      );

      expect(node.size()).toBe(1);
    });

    it('returns self + all children\'s number if TreeNode have children', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
                ])
              ))
          ])
        )
      );

      expect(node.size()).toBe(3);
    });
  });

  describe('find', () => {
    it('returns the value itself when the TreeNode value matches', () => {
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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
      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeObject(new MockTreeID('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')),
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 3')))
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

  describe('values', () => {
    it('returns its own value as Array', () => {
      const value: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));

      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        value
      );

      const values: Array<MockTreeObject<MockTreeID>> = [...node.values()];

      expect(values).toHaveLength(1);
      expect(values[0]).toBe(value);
    });

    it('returns complex Array by retrieving tree', () => {
      const value1: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));
      const value2: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 2'));
      const value3: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 3'));
      const value4: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 4'));
      const value5: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 5'));

      const node: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
        value1,
        ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
          new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(value2,
              ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                  new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(value3)
                ])
              )),
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(value4),
            new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(value5)
          ])
        )
      );

      const values: Array<MockTreeObject<MockTreeID>> = [...node.values()];

      expect(values).toHaveLength(5);
      expect(values[0]).toBe(value1);
      expect(values[1]).toBe(value2);
      expect(values[2]).toBe(value3);
      expect(values[3]).toBe(value4);
      expect(values[4]).toBe(value5);
    });
  });
});
