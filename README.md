# Lluvia

Collections.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/lluvia/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/jamashita/lluvia/actions/workflows/ci.yml)

## Requisite

```
> node -v
v18.9.1

> npm -v
8.19.1

> yarn -v
1.22.19
```

## Conventional commit

```
git cz
```

# Address classes

## (interface) Address\<V\>

This interface represents a collection `Set<V>`. It means, Unique value can be stored in this collection instance.
If the value implements `hasCode()` method from `@jamashita/anden`, the value will be able to stored by its
hash code. In case of hash codes conflict, the previous value will be overwritten. This interface
extends `ReadonlyAddress<V>`.

### `address.add(value: V): Address<V>`

Adds the given `value` to the collection.

### (override) `address.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): Address<W>`

### (override) `address.filter(predicate: BinaryPredicate<V, void>): Address<V>`

This is an overridden version of the `readonlyAddress.filter(predicate)`.

### (override) `address.map<W>(mapping: Mapping<V, W>): Address<W>`

This is an overridden version of the `readonlyAddress.map(mapping)`.

### `address.remove(value: V): Address<V>`

Removes the value that matches the given `value` from the collection.

## ImmutableAddress<V>

This is an immutable class that implements `Address<V>`.

### `ImmutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<ImmutableAddress<V>>`

Takes a `ReadonlyAddress<PromiseLike<V>>` and return a single `Promise<ImmutableAddress<V>>`.

### `ImmutableAddress.empty<V>(): ImmutableAddress<V>`

Returns an empty `ImmutableAddress<V>`.

### `ImmutableAdress.of<V>(collection: Collection<unknown, V>): ImmutableAddress<V>`

Generates a new instance of `ImmutableAddress<V>` from the given `collection`.

### `ImmutableAdress.ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V>`

Generates a new instance of `ImmutableAddress<V>` from the given `set`.

### `immutableAddress.add(value: V): ImmutableAddress<V>`

Adds the given `value` to a new instance of `ImmutableAddress<V>`, instead of the current collection instance, and then
returns the new instance.

### (override) `immutableAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ImmutableAddress<W>`

### (override) `immutableAddress.filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V>`

This is an overridden version of the `address.filter(predicate)`.

### (override) `immutableAddress.map<W>(mapping: Mapping<V, W>): ImmutableAddress<W>`

This is an overridden version of the `address.map(mapping)`.

### `immutableAddress.remove(value: V): ImmutableAddress<V>`

Creates a new instance of `ImmutableAddress<V>` by removing the value that matches the given `value` from the
current collection instance and then returns the new instance.

## MutableAddress<V>

This is an mutable class that implements `Address<V>`.

### `MutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<MutableAddress<V>>`

Takes a `ReadonlyAddress<PromiseLike<V>>` and return a single `Promise<MutableAddress<V>>`.

### `MutableAddress.empty<V>(): MutableAddress<V>`

Returns an empty `MutableAddress<V>`.

### `MutableAdress.of<V>(collection: Collection<unknown, V>): MutableAddress<V>`

Generates a new instance of `MutableAddress<V>` from the given `collection`.

### `MutableAdress.ofSet<V>(set: ReadonlySet<V>): MutableAddress<V>`

Generates a new instance of `MutableAddress<V>` from the given `set`.

### `mutableAddress.add(value: V): this`

Adds the given `value` to the current collection instance and returns the current instance itself.

### (override) `mutableAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): MutableAddress<W>`

### (override) `mutableAddress.filter(predicate: BinaryPredicate<V, void>): MutableAddress<V>`

This is an overridden version of the `address.filter(predicate)`.

### (override) `mutableAddress.map<W>(mapping: Mapping<V, W>): MutableAddress<W>`

This is an overridden version of the `address.map(mapping)`.

### `mutableAddress.remove(value: V): this`

Removes value that matches the given `value` from the collection and returns the current instance itself.

## (interface) ReadonlyAddress\<V\>

This interface represents a readonly version of a `Set<V>` collection, which means that values cannot be added or
modified within the collection instance. If the value implements `hasCode()` method from `@jamashita/anden`, the value
will be able to stored by its hash code. In case of hash codes conflict, the previous value will be overwritten. This
interface `Collection<void, V>` interface.

### (override) `readonlyAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyAddress<W>`

### (override) `readonlyAddress.filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>`

This is an overridden version of the `collection.filter(predicate)`.

### (override) `readonlyAddress.map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>`

This is an overridden version of the `collection.map(mapping)`.

### `readonlyAddress.has(value: :V): boolean`

Returns `true` if the given `value` is contained in the collection.

### `readonlyAddress.toSet(): Set<V>`

Returns a new `Set<V>` containing all the values in the collection.

# Collection classes

## (interface) Collection<K, V>

The common interface for `Sequence<V>`, `Dictionary<K, V>` and `Address<V>`. This interface provides common methods for
manipulating multiple data. `K` represents the key of the collection and `V` represents the value of the collection.
This interface also extends `Iterable<[K, V]>`

### (override) `collection[Symbol.iterator](): IterableIterator<[K, V]>`

This is invoked by `for-of` syntax. Iterate through the key-value pair as a tuple.

### `collection.contains(value: V): boolean`

Returns `true` if the given value is contained in this collection instance.

### `collection.every(predicate: Predicate<V, K>): boolean`

Returns `true` if each item of collection satisfied the given `predicate`.

### `collection.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Collection<K, W>`

### `collection.filter(predicate: BinaryPredicate<V, K>): Collection<K, V>`

Returns the collection of filtered items which satisfy the given `predicate`.

### `collection.find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nulable<W>`

### `collection.find(predicate: BinaryPredicate<V, K>): Nulable<V>`

Returns the value which satisfies the given `predicate` first. If there is no items that satisfy, returns `null`.

### `collection.forEach(foreach: ForEach<V, K>): void`

Iterates through each item and applies the provided `foreach` once.

### `collection.get(key: K): Nullable<V>`

Returns the value of the specified `key`. If there is no value, return `null`.

### `collection.isEmpty(): boolean`

Returns `true` if this collection has no items.

### `collection.iterator(): IterableIterator<[K, V]>`

Returns an iterator that iterates over the key-value pairs in the collection.

### `collection.map<W>(mapping: Mapping<V, W>): Collection<K, W>`

Applies the provided `mapping` to every item and updates the values to the returned result of the `mapping`.

### `collection.size(): number`

Returns the number of elements in the collection.

### `collection.some(predicate: BinaryPredicate<V, K>): boolean`

Returns `true` whether at least one item in the collection satisfies the given `predicate`.

### `collection.values(): IterableIterator<V>`

Returns an iterator for the values in the collection.

# Dictionary classes

## (interface) Dictionary\<K, V\>

This interface represents a collection `Map<K, V>`. If the key implements `hasCode()` method
from `@jamashita/anden`, the value will be able to stored by its hash code.
In case of hash codes conflict, the previous value will be overwritten. This interface extends `ReadonlyDictionary<V>`.

### (override) `dictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Dictionary<K, W>`

### (override) `dictionary.filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>`

This is an overridden version of the `readonlyDictionary.filter(predicate)`.

### (override) `dictionary.map<W>(mapping: Mapping<V, W>): Dictionary<K, W>`

This is an overridden version of the `readonlyDictionary.map(mapping)`.

### `dictionary.remove(key: K): Dictionary<K, V>`

Removes the value that matches the given `key` from the collection.

### `dictionary.set(key: K, value: V): Dictionary<K, V>`

Sets or updates the given `value` to the specified `key` in the collection.

## ImmutableDictionary\<K, V\>

This is an immutable class that implements `Dictionary<K, V>`.

### `ImmutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<ImmutableDictionary<K, V>>`

Takes a `ReadonlyDictionary<PromiseLike<K, V>>` and return a single `Promise<ImmutableDictionary<K, V>>`.

### `ImmutableDictionary.empty<K, V>(): ImmutableDictionary<K, V>`

Returns an empty `ImmutableDictionary<K, V>`.

### `ImmutableDictionary.of<K, V>(collection: Collection<K, V>): ImmutableDictionary<K, V>`

Generates a new instance of `ImmutableDictionary<K, V>` from the given `collection`.

### `ImmutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableDictionary<K, V>`

Generates a new instance of `ImmutableDictionary<K, V>` from the given `map`.

### (override) `immutableDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ImmutableDictionary<K, W>`

### (override) `immutableDictionary.filter(predicate: BinaryPredicate<V, K>): ImmutableDictionary<K, V>`

This is an overridden version of the `dictionary.filter(predicate)`.

### (override) `immutableDictionary.map<W>(mapping: Mapping<V, W>): ImmutableDictionary<K, W>`

This is an overridden version of the `dictionary.map(mapping)`.

### `immutableDictionary.remove(key: K): ImmutableDictionary<K, V>`

Creates a new instance of `ImmutableDictionary<K, V>` by removing the entry that matches the given `key` from the
current collection instance and then returns the new instance.

### `immutableDictionary.set(key: K, value: V): ImmutableDictionary<K, V>`

Sets or updates the given `value` for the specified `key` in a new instance of `ImmutableDictionary<K, V>` instead of
the

## MutableDictionary\<K, V\>

This is an mutable class that implements `Dictionary<K, V>`.

### `MutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<MutableDictionary<K, V>>`

Takes a `ReadonlyDictionary<PromiseLike<K, V>>` and return a single `Promise<MutableDictionary<K, V>>`.

### `MutableDictionary.empty<K, V>(): MutableDictionary<K, V>`

Returns an empty `MutableDictionary<K, V>`.

### `MutableDictionary.of<K, V>(collection: Collection<K, V>): MutableDictionary<K, V>`

Generates a new instance of `MutableDictionary<K, V>` from the given `collection`.

### `MutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): MutableDictionary<K, V>`

Generates a new instance of `MutableDictionary<K, V>` from the given `map`.

### (override) `mutableDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): MutableDictionary<K, W>`

### (override) `mutableDictionary.filter(predicate: BinaryPredicate<V, K>): MutableDictionary<K, V>`

This is an overridden version of the `dictionary.filter(predicate)`.

### (override) `mutableDictionary.map<W>(mapping: Mapping<V, W>): MutableDictionary<K, W>`

This is an overridden version of the `dictionary.map(mapping)`.

### `mutableDictionary.remove(key: K): MutableDictionary<K, V>`

Removes entry that matches the given `key` from the collection and returns the current instance itself.

### `mutableDictionary.set(key: K, value: V): MutableDictionary<K, V>`

Sets or updates the given `value` for the specified `key` to the current collection instance and returns the current
instance itself.

### (interface) ReadonlyDictionary\<K, V\>

This interface represents a readonly version of a `Map<K, V>` collection, which means that values cannot be added or
modified within the collection instance. If the value implements `hasCode()` method from `@jamashita/anden`, the entry
will be
able to stored by its hash code. In case of hash codes conflict, the previous entry will be overwritten. This
interface `Collection<K, V>` interface.

### (override) `readonlyDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyDictionary<K, W>`

### (override) `readonlyDictionary.filter(predicate: BinaryPredicate<V, void>): ReadonlyDictionary<K, V>`

This is an overridden version of the `collection.filter(predicate)`.

### `readonlyDictionary.has(key: K): boolean`

Returns `true` if the given `key` is contained in the collection.

### `readonlyDictionary.keys(): IterableIterator<K>`

Returns an iterator for the keys in the collection.

### (override) `readonlyDictionary.map<W>(mapping: Mapping<V, W>): ReadonlyDictionary<K, W>`

This is an overridden version of the `collection.map(mapping)`.

### `readonlyDictionary.toMap(): Map<K, V>`

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

### `immutableSequence.add(value: V): ImmutableSequence<V>`

Adds the given `value` to a new instance of `ImmutableSequence<V>`, instead of the current collection instance, and then
returns the new instance.

### (override) `immutableSequence.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ImmutableSequence<W>`

### (override) `immutableSequence.filter(predicate: BinaryPredicate<V, number>): ImmutableSequence<W>`

This is an overridden version of the `sequence.filter(predicate)`.

### (override) `immutableSequence.map<W>(mapping: Mapping<V, W>): ImmutableSequence<W>`

This is an overridden version of the `sequence.map(mapping)`.

### `immutableSequence.remove(key: number): ImmutableSequence<V>`

Creates a new instance of `ImmutableSequence<V>` by removing the value that matches the given `key` from the
current collection instance and then returns the new instance.

### `immutableSequecne.set(key, number, value: V): ImmutableSequence<V>`

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

### `mutableSequence.add(value: V): this`

Adds the given `value` to the current collection instance and returns the current instance itself.

### (override) `mutableSequence.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): MutableSequence<W>`

### (override) `mutableSequence.filter(predicate: BinaryPredicate<V, number>): MutableSequence<W>`

This is an overridden version of the `sequence.filter(predicate)`.

### (override) `mutableSequence.map<W>(mapping: Mapping<V, W>): MutableSequence<W>`

This is an overridden version of the `sequence.map(mapping)`.

### `mutableSequence.remove(key: number): this`

Removes value that matches the given `value` from the collection and returns the current instance itself.

### `mutableSequecne.set(key, number, value: V): MutableSequence<V>`

Sets or updates the given `value` for the specified `key` to the current collection instance and returns the current
instance itself.

## (interface) ReadonlySequence\<V\>

This interface represents a readonly version of a `Array<V>` collection, which means that values cannot be added or
modified within the collection instance. This interface `Collection<number, V>` interface.

### (override) `readonlySequence.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): ReadonlySequence<W>`

### (override) `readonlySequence.filter(predicate: BinaryPredicate<V, number>): ReadonlySequence<W>`

This is an overridden version of the `collection.filter(predicate)`.

### (override) `readonlySequence.map<W>(mapping: Mapping<V, W>): ReadonlySequence<W>`

This is an overridden version of the `collection.map(mapping)`.

### `readonlySequence.reduce(reducer: BinaryFunction<V, V, V>, initialValue?: V): V`

Executes the given `reducer` on each item of this instance, passing in the return value from the calculation on the
preceding item. The final result will be a single value.

### `readonlySequence.sort(comparator: BinaryFunction<V, V, number>): ReadonlySequence<V>`

Returns a new instance of sorted `MutableSequence<V>` by indicating by the given comparator.

### `readonlySequence.toArray(): Array<V>`

## (interface) Sequence\<V\>

This interface represents a collection `Array<V>`. This interface extends `ReadonlySequence<V>`.

### `sequence.add(value: V): Sequence<V>`

### (override) `sequence.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, number>): Sequence<W>`

### (override) `sequence.filter(predicate: BinaryPredicate<V, number>): Sequence<W>`

This is an overridden version of the `readonlySequence.filter(predicate)`.

### (override) `sequence.map<W>(mapping: Mapping<V, W>): Sequence<W>`

This is an overridden version of the `readonlySequence.map(mapping)`.

### `sequence.remove(key: number): Sequence<V>`

Removes the value that matches the given `key` from the collection.

### `sequecne.set(key, number, value: V): Sequence<V>`

Sets or updates the given `value` to the specified `key` in the collection.

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
