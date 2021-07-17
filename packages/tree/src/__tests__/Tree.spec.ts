import { ImmutableAddress } from '@jamashita/lluvia-address';
import sinon, { SinonSpy } from 'sinon';
import { MockTree } from '../Mock/MockTree.js';
import { MockTreeID } from '../Mock/MockTreeID.js';
import { MockTreeObject } from '../Mock/MockTreeObject.js';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode.js';

describe('Tree', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock'))));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock'))));

      expect(tree.equals(new MockTreeObject(new MockTreeID('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));
      const tree02: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2'))));
      const tree03: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));
      const tree04: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')))])
          )
        )
      );
      const tree05: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))])
          )
        )
      );
      const tree06: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')))])
          )
        )
      );
      const tree07: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 2')))])
          )
        )
      );
      const tree08: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1')))])
          )
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

  describe('toString', () => {
    it('delegates its node instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject<MockTreeID>(new MockTreeID('mock')));

      root.toString = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('getRoot', () => {
    it('returns root', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));

      root.getValue = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      expect(tree.getRoot()).toBe(root);
    });
  });

  describe('contains', () => {
    it('delegates to retaining root', () => {
      expect.assertions(1);

      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));
      const spy: SinonSpy = sinon.spy();

      root.contains = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      tree.contains(new MockTreeObject(new MockTreeID('mockmock')));

      expect(spy.called).toBe(true);
    });
  });

  describe('find', () => {
    it('delegates to retaining root', () => {
      expect.assertions(1);

      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));
      const spy: SinonSpy = sinon.spy();

      root.find = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      tree.find(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates to retaining root', () => {
      expect.assertions(1);

      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));
      const spy: SinonSpy = sinon.spy();

      root.size = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      tree.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates to retaining root', () => {
      expect.assertions(1);

      const root: MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>> = new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock')));
      const spy: SinonSpy = sinon.spy();

      root.values = spy;

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(root);

      tree.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('iterates root\'s value when the tree only has root', () => {
      expect.assertions(1);

      const obj: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));
      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(obj));

      tree.forEach((v: MockTreeObject<MockTreeID>) => {
        expect(v).toBe(obj);
      });
    });

    it('returns true when all the tree nodes satisfy the value', () => {
      expect.assertions(7);

      const obj1: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 1'));
      const obj2: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 2'));
      const obj3: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 3'));
      const obj4: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 4'));
      const obj5: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 5'));
      const obj6: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 6'));
      const obj7: MockTreeObject<MockTreeID> = new MockTreeObject(new MockTreeID('mock 7'));

      const objs: Array<MockTreeObject<MockTreeID>> = [
        obj1,
        obj2,
        obj3,
        obj5,
        obj7,
        obj6,
        obj4
      ];

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          obj1,
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                obj2
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                obj3,
                ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      obj5,
                      ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                        new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                            obj7
                          )
                        ])
                      )
                    ),
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      obj6
                    )
                  ])
                )
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                obj4
              )
            ])
          )
        )
      );

      let i: number = 0;

      tree.forEach((v: MockTreeObject<MockTreeID>) => {
        expect(v).toBe(objs[i]);
        i++;
      });
    });
  });

  describe('every', () => {
    it('returns true when the tree is only a root and it is the very value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 1';
      });

      expect(every).toBe(true);
    });

    it('returns false when the tree is only a root but it is not the value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));

      const every: boolean = tree.every((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 2';
      });

      expect(every).toBe(false);
    });

    it('returns true when all the tree nodes satisfy the value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 2'))
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 3')),
                ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                        new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                            new MockTreeObject(new MockTreeID('mock 7'))
                          )
                        ])
                      )
                    ),
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 6'))
                    )
                  ])
                )
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 4'))
              )
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
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 2'))
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mocc 3')),
                ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                        new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                            new MockTreeObject(new MockTreeID('mock 7'))
                          )
                        ])
                      )
                    ),
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 6'))
                    )
                  ])
                )
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 4'))
              )
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

  describe('some', () => {
    it('returns true when the tree is only a root and it is the very value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 1';
      });

      expect(some).toBe(true);
    });

    it('returns false when the tree is only a root but it is not the value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(new MockTreeObject(new MockTreeID('mock 1'))));

      const some: boolean = tree.some((v: MockTreeObject<MockTreeID>) => {
        return v.getTreeID().toString() === 'mock 2';
      });

      expect(some).toBe(false);
    });

    it('returns true when one of the tree nodes satisfy the value', () => {
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 2'))
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 3')),
                ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 5')),
                      ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                        new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                            new MockTreeObject(new MockTreeID('mock 7'))
                          )
                        ])
                      )
                    ),
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mock 6'))
                    )
                  ])
                )
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mock 4'))
              )
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
      expect.assertions(1);

      const tree: MockTree<MockTreeID, MockTreeObject<MockTreeID>> = new MockTree<MockTreeID, MockTreeObject<MockTreeID>>(
        new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
          new MockTreeObject(new MockTreeID('mocc 1')),
          ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
            new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mocc 2'))
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mocc 3')),
                ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                  new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mocc 5')),
                      ImmutableAddress.ofSet<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>(
                        new Set<MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>>([
                          new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                            new MockTreeObject(new MockTreeID('mocc 7'))
                          )
                        ])
                      )
                    ),
                    new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                      new MockTreeObject(new MockTreeID('mocc 6'))
                    )
                  ])
                )
              ),
              new MockTreeNode<MockTreeID, MockTreeObject<MockTreeID>>(
                new MockTreeObject(new MockTreeID('mocc 4'))
              )
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
});
