import type { SpyInstance } from 'vitest';
import { MutableAddress } from '../../address/index.js';
import { MockTreeNode } from '../TreeNode/mock/MockTreeNode.js';
import { MockTree } from '../mock/MockTree.js';
import { MockTreeID } from '../mock/MockTreeID.js';
import { MockTreeObject } from '../mock/MockTreeObject.js';

describe('Tree', () => {
  describe('contains', () => {
    it('delegates to retaining root', () => {
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode(new MockTreeObject(new MockTreeID('mock')));

      const spy: SpyInstance = vi.spyOn(root, 'contains');

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(root);

      tree.contains(new MockTreeObject(new MockTreeID('mockmock')));

      expect(spy.mock.calls).toHaveLength(1);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock'))));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock'))));

      expect(tree.equals(new MockTreeObject(new MockTreeID('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      const tree01: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));
      const tree02: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2'))));
      const tree03: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));
      const tree04: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1')))]))
        )
      );
      const tree05: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2')))]))
        )
      );
      const tree06: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 2')),
          MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1')))]))
        )
      );
      const tree07: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 2')),
          MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2')))]))
        )
      );
      const tree08: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1')))]))
        )
      );

      expect(tree01.equals(tree02)).toBe(false);
      expect(tree01.equals(tree03)).toBe(true);
      expect(tree01.equals(tree04)).toBe(false);
      expect(tree01.equals(tree05)).toBe(false);
      expect(tree01.equals(tree06)).toBe(false);
      expect(tree01.equals(tree07)).toBe(false);
      expect(tree01.equals(tree08)).toBe(false);
      expect(tree04.equals(tree05)).toBe(false);
      expect(tree04.equals(tree06)).toBe(false);
      expect(tree04.equals(tree07)).toBe(false);
      expect(tree04.equals(tree08)).toBe(true);
    });
  });

  describe('every', () => {
    it('returns true when the tree is only a root and it is the very value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 1';
      });

      expect(every).toBe(true);
    });

    it('returns false when the tree is only a root but it is not the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 2';
      });

      expect(every).toBe(false);
    });

    it('returns true when all the tree nodes satisfy the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2'))),
              new MockTreeNode(
                new MockTreeObject(new MockTreeID('mock 3')),
                MutableAddress.ofSet(
                  new Set([
                    new MockTreeNode(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 7')))]))
                    ),
                    new MockTreeNode(new MockTreeObject(new MockTreeID('mock 6')))
                  ])
                )
              ),
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 4')))
            ])
          )
        )
      );

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString().includes('mock');
      });

      expect(every).toBe(true);
    });

    it('returns false when one of the tree nodes does not satisfy the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2'))),
              new MockTreeNode(
                new MockTreeObject(new MockTreeID('mocc 3')),
                MutableAddress.ofSet(
                  new Set([
                    new MockTreeNode(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 7')))]))
                    ),
                    new MockTreeNode(new MockTreeObject(new MockTreeID('mock 6')))
                  ])
                )
              ),
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 4')))
            ])
          )
        )
      );

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString().includes('mock');
      });

      expect(every).toBe(false);
    });
  });

  describe('find', () => {
    it('delegates to retaining root', () => {
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode(new MockTreeObject(new MockTreeID('mock')));

      const spy: SpyInstance = vi.spyOn(root, 'find');

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(root);

      tree.find(() => {
        return true;
      });

      expect(spy.mock.calls).toHaveLength(1);
    });
  });

  describe('forEach', () => {
    it("iterates root's value when the tree only has root", () => {
      const obj: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(obj));

      // biome-ignore lint/complexity/noForEach: <explanation>
      tree.forEach((v: MockTreeObject<MockTreeID>) => {
        expect(v).toBe(obj);
      });
    });

    it('returns true when all the tree nodes satisfy the value', () => {
      const obj1: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));
      const obj2: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 2'));
      const obj3: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 3'));
      const obj4: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 4'));
      const obj5: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 5'));
      const obj6: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 6'));
      const obj7: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 7'));

      const objs: Array<MockTreeObject<MockTreeID>> = [obj1, obj2, obj3, obj5, obj7, obj6, obj4];

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          obj1,
          MutableAddress.ofSet(
            new Set([
              new MockTreeNode(obj2),
              new MockTreeNode(
                obj3,
                MutableAddress.ofSet(
                  new Set([new MockTreeNode(obj5, MutableAddress.ofSet(new Set([new MockTreeNode(obj7)]))), new MockTreeNode(obj6)])
                )
              ),
              new MockTreeNode(obj4)
            ])
          )
        )
      );

      let i = 0;

      // biome-ignore lint/complexity/noForEach: <explanation>
      tree.forEach((v: MockTreeObject<MockTreeID>) => {
        expect(v).toBe(objs[i]);
        i++;
      });
    });
  });

  describe('getRoot', () => {
    it('returns root', () => {
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode(new MockTreeObject(new MockTreeID('mock')));
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(root);

      expect(tree.getRoot()).toBe(root);
    });
  });

  describe('size', () => {
    it('delegates to retaining root', () => {
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode(new MockTreeObject(new MockTreeID('mock')));

      const spy: SpyInstance = vi.spyOn(root, 'size');

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(root);

      tree.size();

      expect(spy.mock.calls).toHaveLength(1);
    });
  });

  describe('some', () => {
    it('returns true when the tree is only a root and it is the very value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 1';
      });

      expect(some).toBe(true);
    });

    it('returns false when the tree is only a root but it is not the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(new MockTreeNode(new MockTreeObject(new MockTreeID('mock 1'))));

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 2';
      });

      expect(some).toBe(false);
    });

    it('returns true when one of the tree nodes satisfy the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mock 1')),
          MutableAddress.ofSet(
            new Set([
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 2'))),
              new MockTreeNode(
                new MockTreeObject(new MockTreeID('mock 3')),
                MutableAddress.ofSet(
                  new Set([
                    new MockTreeNode(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mock 7')))]))
                    ),
                    new MockTreeNode(new MockTreeObject(new MockTreeID('mock 6')))
                  ])
                )
              ),
              new MockTreeNode(new MockTreeObject(new MockTreeID('mock 4')))
            ])
          )
        )
      );

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString().includes('mock 6');
      });

      expect(some).toBe(true);
    });

    it('returns false when none of the tree nodes satisfy the value', () => {
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(
        new MockTreeNode(
          new MockTreeObject(new MockTreeID('mocc 1')),
          MutableAddress.ofSet(
            new Set([
              new MockTreeNode(new MockTreeObject(new MockTreeID('mocc 2'))),
              new MockTreeNode(
                new MockTreeObject(new MockTreeID('mocc 3')),
                MutableAddress.ofSet(
                  new Set([
                    new MockTreeNode(
                      new MockTreeObject(new MockTreeID('mocc 5')),
                      MutableAddress.ofSet(new Set([new MockTreeNode(new MockTreeObject(new MockTreeID('mocc 7')))]))
                    ),
                    new MockTreeNode(new MockTreeObject(new MockTreeID('mocc 6')))
                  ])
                )
              ),
              new MockTreeNode(new MockTreeObject(new MockTreeID('mocc 4')))
            ])
          )
        )
      );

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString().includes('mock');
      });

      expect(some).toBe(false);
    });
  });

  describe('values', () => {
    it('delegates to retaining root', () => {
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode(new MockTreeObject(new MockTreeID('mock')));

      const spy: SpyInstance = vi.spyOn(root, 'values');

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree(root);

      tree.values();

      expect(spy.mock.calls).toHaveLength(1);
    });
  });
});
