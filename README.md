# Lluvia

Collections.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/lluvia/actions/workflows/ci.yml/badge.svg)](https://github.com/jamashita/lluvia/actions/workflows/ci.yml)

## Install

```text
yarn add @jamashita/lluvia
```

## Prerequisite

```
> node -v
v20.12.2

> npm -v
10.5.0

> yarn -v
1.22.21
```

## Conventional commit

```
git cz
```

# Address classes

## (interface) Address\<V\>

This interface represents a collection `Set<V>`. It means, Unique values can be stored in this collection instance. If
the value implements the `hashCode()` method from `@jamashita/anden`, the value will be stored by its hash code. In case
of hash code conflicts, the previous value will be overwritten. This interface extends the `ReadonlyAddress<V>`.

### `Address.prototype.add(value: V): Address<V>`

Adds the given `value` to the collection.

### (override) `Address.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): Address<W>`

### (override) `Address.prototype.filter(predicate: BinaryPredicate<V, void>): Address<V>`

This is an overridden version of the `ReadonlyAddress.prototype.filter(predicate)`.

### (override) `Address.prototype.map<W>(mapping: Mapping<V, W>): Address<W>`

This is an overridden version of the `ReadonlyAddress.prototype.map(mapping)`.

### `Address.prototype.remove(value: V): Address<V>`

Removes the value that matches the given `value` from the collection.

## ImmutableAddress<V>

This is an immutable class that implements `Address<V>`. It does not allow adding or removing values from the
collection directly, but instead returns a new instance of the collection with the added or removed values.

### `ImmutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<ImmutableAddress<V>>`

Takes a `ReadonlyAddress<PromiseLike<V>>` and returns a single `Promise<ImmutableAddress<V>>` that resolves with a new
instance of `ImmutableAddress<V>` containing the resolved values.

### `ImmutableAddress.empty<V>(): ImmutableAddress<V>`

Returns an empty `ImmutableAddress<V>`.

### `ImmutableAdress.of<V>(collection: Collection<unknown, V>): ImmutableAddress<V>`

Generates a new instance of `ImmutableAddress<V>` from the given `collection`.

### `ImmutableAdress.ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V>`

Generates a new instance of `ImmutableAddress<V>` from the given `set`.

### `ImmutableAddress.prototype.add(value: V): ImmutableAddress<V>`

Adds the given `value` to a new instance of `ImmutableAddress<V>`, instead of the current collection instance, and then
returns the new instance.

### (override) `ImmutableAddress.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ImmutableAddress<W>`

### (override) `ImmutableAddress.prototype.filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V>`

This is an overridden version of the `Address.prototype.filter(predicate)`.

### (override) `ImmutableAddress.prototype.map<W>(mapping: Mapping<V, W>): ImmutableAddress<W>`

This is an overridden version of the `Address.prototype.map(mapping)`.

### `ImmutableAddress.prototype.remove(value: V): ImmutableAddress<V>`

Creates a new instance of `ImmutableAddress<V>` by removing the value that matches the given `value` from the current
collection instance and then returns the new instance.

## MutableAddress<V>

This is a mutable class that implements Address<V>. It allows adding and removing values from the collection.

### `MutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<MutableAddress<V>>`

Takes a `ReadonlyAddress<PromiseLike<V>>` and returns a single `Promise<MutableAddress<V>>` that resolves with a new
instance of `MutableAddress<V>` containing the resolved values.

### `MutableAddress.empty<V>(): MutableAddress<V>`

Returns an empty `MutableAddress<V>`.

### `MutableAdress.of<V>(collection: Collection<unknown, V>): MutableAddress<V>`

Generates a new instance of `MutableAddress<V>` from the given `collection`.

### `MutableAdress.ofSet<V>(set: ReadonlySet<V>): MutableAddress<V>`

Generates a new instance of `MutableAddress<V>` from the given `set`.

### `MutableAddress.prototype.add(value: V): this`

Adds the given `value` to the current collection instance and returns the current instance itself.

### (override) `MutableAddress.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): MutableAddress<W>`

### (override) `MutableAddress.prototype.filter(predicate: BinaryPredicate<V, void>): MutableAddress<V>`

This is an overridden version of the `Address.prototype.filter(predicate)`.

### (override) `MutableAddress.prototype.map<W>(mapping: Mapping<V, W>): MutableAddress<W>`

This is an overridden version of the `Address.prototype.map(mapping)`.

### `MutableAddress.prototype.remove(value: V): this`

Removes the value that matches the given `value` from the collection and returns the current instance itself.

## (interface) ReadonlyAddress\<V\>

This interface represents a read-only version of a `Set<V>` collection, meaning that values cannot be added or modified
within the collection instance. If the value implements the `hashCode()` method from `@jamashita/anden`, the value will
be stored based on its hash code. In case of hash code conflicts, the previous value will be overwritten. This interface
extends `Collection<void, V>`.

### (override) `ReadonlyAddress.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyAddress<W>`

### (override) `ReadonlyAddress.prototype.filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>`

This is an overridden version of the `Collection.prototype.filter(predicate)`.

### (override) `ReadonlyAddress.prototype.map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>`

This is an overridden version of the `Collection.prototype.map(mapping)`.

### `ReadonlyAddress.prototype.has(value: :V): boolean`

Returns `true` if the given `value` is contained in the collection.

### `ReadonlyAddress.prototype.toSet(): Set<V>`

Returns a new `Set<V>` containing all the values in the collection.

# Collection classes

## (interface) Collection<K, V>

The common interface for `Sequence<V>`, `Dictionary<K, V>` and `Address<V>`. This interface provides common methods for
manipulating multiple data. `K` represents the key of the collection and `V` represents the value of the collection.
This interface also extends `Iterable<[K, V]>`.

### (override) `Collection.prototype[Symbol.iterator](): IterableIterator<[K, V]>`

This method is invoked by the `for-of` loop. It allows iteration through the key-value pairs of the collection as
tuples.

### `Collection.prototype.contains(value: V): boolean`

Returns `true` if the given `value` is contained within this collection instance.

### `Collection.prototype.every(predicate: Predicate<V, K>): boolean`

Returns `true` if every item in the collection satisfies the given `predicate`.

### `Collection.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Collection<K, W>`

### `Collection.prototype.filter(predicate: BinaryPredicate<V, K>): Collection<K, V>`

Returns a new collection containing only the items that satisfy the given `predicate`. The type of items in the new
collection depends on whether the `predicate` is narrowing or not.

### `Collection.prototype.find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nulable<W>`

### `Collection.prototype.find(predicate: BinaryPredicate<V, K>): Nulable<V>`

Returns the first value that satisfies the given `predicate`. If there are no items that satisfy the `predicate`,
returns `null`.

### `Collection.prototype.forEach(foreach: ForEach<V, K>): void`

Iterates through each item and applies the provided `foreach` once.

### `Collection.prototype.get(key: K): Nullable<V>`

Returns the value of the specified `key`. If there is no value, return `null`.

### `Collection.prototype.isEmpty(): boolean`

Returns `true` if this collection has no items.

### `Collection.prototype.iterator(): IterableIterator<[K, V]>`

Returns an iterator that iterates over the key-value pairs in the collection.

### `Collection.prototype.map<W>(mapping: Mapping<V, W>): Collection<K, W>`

Applies the provided `mapping` to every item and updates the values to the returned result of the `mapping`.

### `Collection.prototype.size(): number`

Returns the number of items in the collection.

### `Collection.prototype.some(predicate: BinaryPredicate<V, K>): boolean`

Returns `true` if at least one item in the collection satisfies the given `predicate`.

### `Collection.prototype.values(): IterableIterator<V>`

Returns an iterator that iterates over the values in the collection.

# Dictionary classes

## (interface) Dictionary\<K, V\>

This interface represents a collection `Map<K, V>`. If the key implements `hasCode()` method
from `@jamashita/anden`, the value will be able to stored by its hash code.
In case of hash codes conflict, the previous value will be overwritten. This interface extends `ReadonlyDictionary<V>`.

### (override) `Dictionary.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Dictionary<K, W>`

### (override) `Dictionary.prototype.filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>`

This is an overridden version of the `ReadonlyDictionary.prototype.filter(predicate)`.

### (override) `Dictionary.prototype.map<W>(mapping: Mapping<V, W>): Dictionary<K, W>`

This is an overridden version of the `ReadonlyDictionary.prototype.map(mapping)`.

### `Dictionary.prototype.remove(key: K): Dictionary<K, V>`

Removes the value that matches the given `key` from the collection.

### `Dictionary.prototype.set(key: K, value: V): Dictionary<K, V>`

Sets or updates the given `value` to the specified `key` in the collection.

## ImmutableDictionary\<K, V\>

This is an immutable class that implements `Dictionary<K, V>`. It does not allow adding or removing entries from the
collection directly, but instead returns a new instance of the collection with the added or removed entries.

### `ImmutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<ImmutableDictionary<K, V>>`

Takes a `ReadonlyDictionary<K, PromiseLike<V>>` and return a single `Promise<ImmutableDictionary<K, V>>` that resolves
with a new instance of `ImmutableDictionary<K, V>` containing the resolved values.

### `ImmutableDictionary.empty<K, V>(): ImmutableDictionary<K, V>`

Returns an empty `ImmutableDictionary<K, V>`.

### `ImmutableDictionary.of<K, V>(collection: Collection<K, V>): ImmutableDictionary<K, V>`

Generates a new instance of `ImmutableDictionary<K, V>` from the given `collection`.

### `ImmutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableDictionary<K, V>`

Generates a new instance of `ImmutableDictionary<K, V>` from the given `map`.

### (override) `ImmutableDictionary.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ImmutableDictionary<K, W>`

### (override) `ImmutableDictionary.prototype.filter(predicate: BinaryPredicate<V, K>): ImmutableDictionary<K, V>`

This is an overridden version of the `Dictionary.prototype.filter(predicate)`.

### (override) `ImmutableDictionary.prototype.map<W>(mapping: Mapping<V, W>): ImmutableDictionary<K, W>`

This is an overridden version of the `Dictionary.prototype.map(mapping)`.

### `ImmutableDictionary.prototype.remove(key: K): ImmutableDictionary<K, V>`

Creates a new instance of `ImmutableDictionary<K, V>` by removing the entry that matches the given `key` from the
current collection instance and then returns the new instance.

### `ImmutableDictionary.prototype.set(key: K, value: V): ImmutableDictionary<K, V>`

Sets or updates the given `value` for the specified `key` in a new instance of `ImmutableDictionary<K, V>`, instead of
the current collection instance, and returns the new instance.

## MutableDictionary\<K, V\>

This is an mutable class that implements `Dictionary<K, V>`.

### `MutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<MutableDictionary<K, V>>`

Takes a `ReadonlyDictionary<K, PromiseLike<V>>` and returns a single `Promise<MutableDictionary<K, V>>` that resolves
with a new instance of `MutableDictionary<K, V>` containing the resolved values.

### `MutableDictionary.empty<K, V>(): MutableDictionary<K, V>`

Returns an empty `MutableDictionary<K, V>`.

### `MutableDictionary.of<K, V>(collection: Collection<K, V>): MutableDictionary<K, V>`

Generates a new instance of `MutableDictionary<K, V>` from the given `collection`.

### `MutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): MutableDictionary<K, V>`

Generates a new instance of `MutableDictionary<K, V>` from the given `map`.

### (override) `MutableDictionary.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): MutableDictionary<K, W>`

### (override) `MutableDictionary.prototype.filter(predicate: BinaryPredicate<V, K>): MutableDictionary<K, V>`

This is an overridden version of the `Dictionary.prototype.filter(predicate)`.

### (override) `MutableDictionary.prototype.map<W>(mapping: Mapping<V, W>): MutableDictionary<K, W>`

This is an overridden version of the `Dictionary.prototype.map(mapping)`.

### `MutableDictionary.prototype.remove(key: K): this`

Removes entry that matches the given `key` from the collection and returns the current instance itself.

### `MutableDictionary.prototype.set(key: K, value: V): this`

Sets or updates the given `value` for the specified `key` to the current collection instance and returns the current
instance itself.

### (interface) ReadonlyDictionary\<K, V\>

This interface represents a read-only version of a `Map<K, V>` collection, which means that values cannot be added or
modified within the collection instance. If the value implements `hasCode()` method from `@jamashita/anden`, the entry
will be able to stored by its hash code. In case of hash codes conflict, the previous entry will be overwritten. This
interface extends `Collection<K, V>`.

### (override) `ReadonlyDictionary.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyDictionary<K, W>`

### (override) `ReadonlyDictionary.prototype.filter(predicate: BinaryPredicate<V, void>): ReadonlyDictionary<K, V>`

This is an overridden version of the `Collection.prototype.filter(predicate)`.

### `ReadonlyDictionary.prototype.has(key: K): boolean`

Returns `true` if the given `key` is contained in the collection.

### `ReadonlyDictionary.prototype.keys(): IterableIterator<K>`

Returns an iterator that iterates over the keys in the collection.

### (override) `ReadonlyDictionary.prototype.map<W>(mapping: Mapping<V, W>): ReadonlyDictionary<K, W>`

This is an overridden version of the `Collection.prototype.map(mapping)`.

### `ReadonlyDictionary.prototype.toMap(): Map<K, V>`

Returns a new `Map<K, V>` containing all the entries in the collection.

# Sequence classes

## ImmutableSequence\<V\>

This is an immutable class that implements `Sequence<V>`.

### `ImmutableSequecne.await<V>(sequence: ReadonlySequence<PromiseLike<V>>): Promise<ImmutableSequence<V>>`

Takes a `ReadonlySequence<PromiseLike<V>>` and return a single `Promise<ImmutableSequence<V>>`.

### `ImmutableSequence.empty<V>(): ImmutableSequence<V>`

Returns an empty `ImmutableSequence<V>`.

### `ImmutableSequence.of<V>(collection: Collection<number, V>): ImmutableSequence<V>`

Generates a new instance of `ImmutableSequence<V>` from the given `collection`.

### `ImmutableSequence.ofArray<V>(array: ReadonlyArray<V>): ImmutableSequence<V>`

Generates a new instance of `MutableSequence<V>` from the given `array`.

### `ImmutableSequence.prototype.add(value: V): ImmutableSequence<V>`

Adds the given `value` to a new instance of `ImmutableSequence<V>`, instead of the current collection instance, and then
returns the new instance.

### (override) `ImmutableSequence.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ImmutableSequence<W>`

### (override) `ImmutableSequence.prototype.filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<W>`

This is an overridden version of the `Sequence.prototype.filter(predicate)`.

### (override) `ImmutableSequence.prototype.map<W>(mapping: Mapping<V, W>): ImmutableSequence<W>`

This is an overridden version of the `Sequence.prototype.map(mapping)`.

### `ImmutableSequence.prototype.remove(key: number): ImmutableSequence<V>`

Creates a new instance of `ImmutableSequence<V>` by removing the value that matches the given `key` from the
current collection instance and then returns the new instance.

### `ImmutableSequecne.prototype.set(key, number, value: V): ImmutableSequence<V>`

Sets or updates the given `value` for the specified `key` in a new instance of `ImmutableSequence<V>` instead of the

## MutableSequence\<V\>

This is an mutable class that implements `Sequence<V>`.

### `MutableSequecne.await<V>(sequence: ReadonlySequence<PromiseLike<V>>): Promise<MutableSequence<V>>`

Takes a `ReadonlySequence<PromiseLike<V>>` and return a single `Promise<MutableSequence<V>>`.

### `MutableSequence.empty<V>(): MutableSequence<V>`

Returns an empty `MutableSequence<V>`.

### `MutableSequence.of<V>(collection: Collection<number, V>): MutableSequence<V>`

Generates a new instance of `MutableSequence<V>` from the given `collection`.

### `MutableSequence.ofArray<V>(array: ReadonlyArray<V>): MutableSequence<V>`

Generates a new instance of `MutableSequence<V>` from the given `array`.

### `MutableSequence.prototype.add(value: V): this`

Adds the given `value` to the current collection instance and returns the current instance itself.

### (override) `MutableSequence.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): MutableSequence<W>`

### (override) `MutableSequence.prototype.filter(predicate: BinaryPredicate<V, number>): MutableSequence<W>`

This is an overridden version of the `Sequence.prototype.filter(predicate)`.

### (override) `MutableSequence.prototype.map<W>(mapping: Mapping<V, W>): MutableSequence<W>`

This is an overridden version of the `Sequence.prototype.map(mapping)`.

### `MutableSequence.prototype.remove(key: number): this`

Removes value that matches the given `value` from the collection and returns the current instance itself.

### `MutableSequecne.prototype.set(key, number, value: V): MutableSequence<V>`

Sets or updates the given `value` for the specified `key` to the current collection instance and returns the current
instance itself.

## (interface) ReadonlySequence\<V\>

This interface represents a read-only version of a `Array<V>` collection, which means that values cannot be added or
modified within the collection instance. This interface extends `Collection<number, V>`.

### (override) `ReadonlySequence.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ReadonlySequence<W>`

### (override) `ReadonlySequence.prototype.filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<W>`

This is an overridden version of the `Collection.prototype.filter(predicate)`.

### (override) `ReadonlySequence.prototype.map<W>(mapping: Mapping<V, W>): ReadonlySequence<W>`

This is an overridden version of the `Collection.prototype.map(mapping)`.

### `ReadonlySequence.prototype.reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V`

Executes the given `reducer` on each item of this instance, passing in the return value from the calculation on the
preceding item. The final result will be a single value. The `initialValue` is an optional parameter that can be used as
a starting point for the reduction.

### `ReadonlySequence.prototype.sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>`

Returns a new instance of `ReadonlySequence<V>` sorted according to the given `comparator`.

### `ReadonlySequence.prototype.toArray(): Array<V>`

Returns a new `Array<V>` containing all the values in the collection.

## (interface) Sequence\<V\>

This interface represents a collection `Array<V>`. This interface extends `ReadonlySequence<V>`.

### `Sequence.prototype.add(value: V): Sequence<V>`

Adds the given `value` to the collection.

### (override) `Sequence.prototype.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): Sequence<W>`

### (override) `Sequence.prototype.filter(predicate: BinaryPredicate<V, number>): Sequence<W>`

This is an overridden version of the `ReadonlySequence.prototype.filter(predicate)`.

### (override) `Sequence.prototype.map<W>(mapping: Mapping<V, W>): Sequence<W>`

This is an overridden version of the `ReadonlySequence.prototype.map(mapping)`.

### `Sequence.prototype.remove(key: number): Sequence<V>`

Removes the value at the specified `key` from the collection.

### `Sequecne.prototype.set(key, number, value: V): Sequence<V>`

Sets or updates the given `value` at the specified `key` in the collection.

# Tree

## Interfaces

### Tree

A typical tree that can contain below 2 kinds of data.

### SerializablieTreeObject

An interface that can be into string.

### StructurableTreeObject

An interface that can be closure table.

## Classes

### SerializableTree

A concrete class which nodes are `SerializablieTreeObject`.

### StructurableTree

A concrete class which nodes are `StructurableTreeObject`.

## License

[MIT](LICENSE)
