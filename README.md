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
hashcode. In case of hashcodes conflict, the previous value will be overwritten. This interface
extends `ReadonlyAddress<V>`.

### `address.add(value: V): Address<V>`

Add the given `value` to the collection.

### (override) `address.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): Address<W>`

### (override) `address.filter(predicate: BinaryPredicate<V, void>): Address<V>`

This is an overridden version of the `readonlyAddress.filter(predicate)`.

### (override) `address.map<W>(mapping: Mapping<V, W>): Address<W>`

This is an overridden version of the `readonlyAddress.map(mapping)`.

### `address.remove(value: V): Address<V>`

Remove the value that matches the given `value` from the collection.

## ImmutableAddress<V>

This is an immutable class that implements `Address<V>`.

### `ImmutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<ImmutableAddress<V>>`

Take a `ReadonlyAddress<PromiseLike<V>>` and return a single `Promise<ImmutableAddress<V>>`.

### `ImmutableAddress.empty<V>(): ImmutableAddress<V>`

Return an empty `ImmutableAddress<V>`.

### `ImmutableAdress.of<V>(collection: Collection<unknown, V>): ImmutableAddress<V>`

Generate a new instance of `ImmutableAddress<V>` from the given `collection`.

### `ImmutableAdress.ofSet<V>(set: ReadonlySet<V>): ImmutableAddress<V>`

Generate a new instance of `ImmutableAddress<V>` from the given `set`.

### `immutableAddress.add(value: V): ImmutableAddress<V>`

Add the given `value` to a new instance of `ImmutableAddress<V>`, instead of the current collection instance, and then
returns the new instance.

### (override) `immutableAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ImmutableAddress<W>`

### (override) `immutableAddress.filter(predicate: BinaryPredicate<V, void>): ImmutableAddress<V>`

This is an overridden version of the `address.filter(predicate)`.

### (override) `immutableAddress.map<W>(mapping: Mapping<V, W>): ImmutableAddress<W>`

This is an overridden version of the `address.map(mapping)`.

### `immutableAddress.remove(value: V): ImmutableAddress<V>`

Create a new instance of `ImmutableAddress<V>` by removing the value that matches the given `value` from the
current collection instance and then returns the new instance.

## MutableAddress<V>

This is an mutable class that implements `Address<V>`.

### `MutableAddress.await<V>(address: ReadonlyAddress<PromiseLike<V>>): Promise<MutableAddress<V>>`

Take a `ReadonlyAddress<PromiseLike<V>>` and return a single `Promise<MutableAddress<V>>`.

### `MutableAddress.empty<V>(): MutableAddress<V>`

Return an empty `MutableAddress<V>`.

### `MutableAdress.of<V>(collection: Collection<unknown, V>): MutableAddress<V>`

Generate a new instance of `MutableAddress<V>` from the given `collection`.

### `MutableAdress.ofSet<V>(set: ReadonlySet<V>): MutableAddress<V>`

Generate a new instance of `MutableAddress<V>` from the given `set`.

### `mutableAddress.add(value: V): this`

Add the given `value` to the current collection instance and returns the current instance itself.

### (override) `mutableAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): MutableAddress<W>`

### (override) `mutableAddress.filter(predicate: BinaryPredicate<V, void>): MutableAddress<V>`

This is an overridden version of the `address.filter(predicate)`.

### (override) `mutableAddress.map<W>(mapping: Mapping<V, W>): MutableAddress<W>`

This is an overridden version of the `address.map(mapping)`.

### `mutableAddress.remove(value: V): this`

Remove value that matches the given `value` from the collection and returns the current instance itself.

## (interface) ReadonlyAddress\<V\>

This interface represents a readonly version of a `Set` collection, which means that values cannot be added or modified
within the collection instance. If the value implements `hasCode()` method from `@jamashita/anden`, the value will be
able to stored by its hashcode. In case of hashcodes conflict, the previous value will be overwritten. This
interface `Collection<void, V>` interface.

### (override) `readonlyAddress.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyAddress<W>`

### (override) `readonlyAddress.filter(predicate: BinaryPredicate<V, void>): ReadonlyAddress<V>`

This is an overridden version of the `collection.filter(predicate)`.

### (override) `readonlyAddress.map<W>(mapping: Mapping<V, W>): ReadonlyAddress<W>`

This is an overridden version of the `collection.map(mapping)`.

### `readonlyAddress.has(value: :V): boolean`

Return `true` if the given `value` is contained in the collection.

### `readonlyAddress.toSet(): Set<V>`

Return a new `Set` containing all the values in the collection.

# Collection classes

## (interface) Collection<K, V>

The common interface for `Sequence`, `Dictionary` and `Address`. This interface provides common methods for manipulating
multiple data. `K` represents the key of the collection and `V` represents the value of the collection. This interface
also extends `Iterable<[K, V]>`

### (override) `collection[Symbol.iterator](): IterableIterator<[K, V]>`

This is invoked by `for-of` syntax. Iterate through the key-value pair as a tuple.

### `collection.contains(value: V): boolean`

Return `true` if the given value is contained in this collection instance.

### `collection.every(predicate: Predicate<V, K>): boolean`

Return `true` if each item of collection satisfied the given `predicate`.

### `collection.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Collection<K, W>`

### `collection.filter(predicate: BinaryPredicate<V, K>): Collection<K, V>`

Return the collection of filtered items which satisfy the given `predicate`.

### `collection.find<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Nulable<W>`

### `collection.find(predicate: BinaryPredicate<V, K>): Nulable<V>`

Returns the value which satisfies the given `predicate` first. if there is no items that satisfy, return `null`.

### `collection.forEach(foreach: ForEach<V, K>): void`

Iterates through each item and applies the provided `foreach` once.

### `collection.get(key: K): Nullable<V>`

Return the value of the specified `key`. If there is no value, return `null`.

### `collection.isEmpty(): boolean`

Return `true` if this collection has no items.

### `collection.iterator(): IterableIterator<[K, V]>`

Return an iterator that iterates over the key-value pairs in the collection.

### `collection.map<W>(mapping: Mapping<V, W>): Collection<K, W>`

Applies the provided `mapping` to every item and updates the values to the returned result of the `mapping`.

### `collection.size(): number`

Return the number of elements in the collection.

### `collection.some(predicate: BinaryPredicate<V, K>): boolean`

Return `true` whether at least one item in the collection satisfies the given `predicate`.

### `collection.values(): IterableIterator<V>`

Return an iterator for the values in the collection.

# Dictionary classes

## (interface) Dictionary\<K, V\>

This interface represents a collection `Map<K, V>`. If the key implements `hasCode()` method
from `@jamashita/anden`, the value will be able to stored by its hashcode.
In case of hashcodes conflict, the previous value will be overwritten. This interface extends `ReadonlyDictionary<V>`.

### (override) `dictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): Dictionary<K, W>`

### (override) `dictionary.filter(predicate: BinaryPredicate<V, K>): Dictionary<K, V>`

This is an overridden version of the `readonlyDictionary.filter(predicate)`.

### (override) `dictionary.map<W>(mapping: Mapping<V, W>): Dictionary<K, W>`

This is an overridden version of the `readonlyDictionary.map(mapping)`.

### `dictionary.remove(key: K): Dictionary<K, V>`

Remove the value that matches the given `key` from the collection.

### `dictionary.set(key: K, value: V): Dictionary<K, V>`

Set or update the given `value` to the specified `key` in the collection.

## ImmutableDictionary\<K, V\>

This is an immutable class that implements `Dictionary<K, V>`.

### `ImmutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<ImmutableDictionary<K, V>>`

Take a `ReadonlyDictionary<PromiseLike<K, V>>` and return a single `Promise<ImmutableDictionary<K, V>>`.

### `ImmutableDictionary.empty<K, V>(): ImmutableDictionary<K, V>`

Return an empty `ImmutableDictionary<K, V>`.

### `ImmutableDictionary.of<K, V>(collection: Collection<K, V>): ImmutableDictionary<K, V>`

Generate a new instance of `ImmutableDictionary<K, V>` from the given `collection`.

### `ImmutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): ImmutableDictionary<K, V>`

Generate a new instance of `ImmutableDictionary<K, V>` from the given `map`.

### (override) `immutableDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): ImmutableDictionary<K, W>`

### (override) `immutableDictionary.filter(predicate: BinaryPredicate<V, K>): ImmutableDictionary<K, V>`

This is an overridden version of the `dictionary.filter(predicate)`.

### (override) `immutableDictionary.map<W>(mapping: Mapping<V, W>): ImmutableDictionary<K, W>`

This is an overridden version of the `dictionary.map(mapping)`.

### `immutableDictionary.remove(key: K): ImmutableDictionary<K, V>`

Create a new instance of `ImmutableDictionary<K, V>` by removing the entry that matches the given `key` from the
current collection instance and then returns the new instance.

### `immutableDictionary.set(key: K, value: V): ImmutableDictionary<K, V>`

Set or update the given `value` for the specified `key` in a new instance of `ImmutableDictionary<K, V>` instead of the

## MutableDictionary\<K, V\>

This is an mutable class that implements `Dictionary<K, V>`.

### `MutableDictionary.await<K, V>(dictionary: ReadonlyDictionary<K, PromiseLike<V>>): Promise<MutableDictionary<K, V>>`

Take a `ReadonlyDictionary<PromiseLike<K, V>>` and return a single `Promise<MutableDictionary<K, V>>`.

### `MutableDictionary.empty<K, V>(): MutableDictionary<K, V>`

Return an empty `MutableDictionary<K, V>`.

### `MutableDictionary.of<K, V>(collection: Collection<K, V>): MutableDictionary<K, V>`

Generate a new instance of `MutableDictionary<K, V>` from the given `collection`.

### `MutableAdress.ofMap<K, V>(map: ReadonlyMap<K, V>): MutableDictionary<K, V>`

Generate a new instance of `MutableDictionary<K, V>` from the given `map`.

### (override) `mutableDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, K>): MutableDictionary<K, W>`

### (override) `mutableDictionary.filter(predicate: BinaryPredicate<V, K>): MutableDictionary<K, V>`

This is an overridden version of the `dictionary.filter(predicate)`.

### (override) `mutableDictionary.map<W>(mapping: Mapping<V, W>): MutableDictionary<K, W>`

This is an overridden version of the `dictionary.map(mapping)`.

### `mutableDictionary.remove(key: K): MutableDictionary<K, V>`

Remove entry that matches the given `key` from the collection and returns the current instance itself.

### `mutableDictionary.set(key: K, value: V): MutableDictionary<K, V>`

Set or update the given `value` for the specified `key` to the current collection instance and returns the current
instance itself.

### (interface) ReadonlyDictionary\<K, V\>

This interface represents a readonly version of a `Map` collection, which means that values cannot be added or modified
within the collection instance. If the value implements `hasCode()` method from `@jamashita/anden`, the entry will be
able to stored by its hashcode. In case of hashcodes conflict, the previous entry will be overwritten. This
interface `Collection<K, V>` interface.

### (override) `readonlyDictionary.filter<W extends V>(predicate: NarrowingBinaryPredicate<V, W, void>): ReadonlyDictionary<K, W>`

### (override) `readonlyDictionary.filter(predicate: BinaryPredicate<V, void>): ReadonlyDictionary<K, V>`

This is an overridden version of the `collection.filter(predicate)`.

### `readonlyDictionary.has(key: K): boolean`

Return `true` if the given `key` is contained in the collection.

### `readonlyDictionary.keys(): IterableIterator<K>`

Return an iterator for the keys in the collection.

### (override) `readonlyDictionary.map<W>(mapping: Mapping<V, W>): ReadonlyDictionary<K, W>`

This is an overridden version of the `collection.map(mapping)`.

### `readonlyDictionary.toMap(): Map<K, V>`

Return a new `Map` containing all the entries in the collection.

## Classes

# Sequence

## Interfaces

### Sequence

Alias for `Array`. implements `Collection`.

### ReadonlySequence

Alias for `ReadonlyArray`. implements `Collection`.

## Classes

### ImmutableSequence

When an element is added or removed, generates new `Sequence` and return it. This instance does not change its
elements.

### MutableSequence

As usual collection, it can add elements in this without creating a new instance.

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
