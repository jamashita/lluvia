# Lluvia

Collections.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/lluvia/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/jamashita/lluvia/actions/workflows/ci.yml)

## Requisite

```
> node -v
v18.0.0

> npm -v
8.6.0

> yarn -v
1.22.18
```

## Conventional commit

```
git cz
```

# Collection

## Interface

### Collection

`Collection` interface that are totally wrapping `Array`, `Map`, and `Set` in order to handle same signature and
immutability.

# Address

## Interfaces

### Address

Alias for `Set`. implements `Collection`.

### ReadonlyAddress

Alias for `ReadonlySet`. implements `Collection`.

## Classes

### ImmutableAddress

When an element is added or removed, generates new `Address` and return it. This instance does not change its elements.

### MutableAddress

As usual collection, it can add elements in this without creating a new instance.

# Dictionary

## Interfaces

### Dictionary

Alias for `Map`. implements `Collection`.

### ReadonlyDictionary

Alias for `ReadonlyMap`. implements `collection`.

## Classes

### ImmutableDictionary

When an element is added or removed, generates new `Dictionary` and return it. This instance does not change its
elements.

### MutableDictionary

As usual collection, it can add elements in this without creating a new instance.

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
