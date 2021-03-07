# Lluvia/Collection

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![CI](https://github.com/jamashita/publikum/workflows/CI/badge.svg)

## Interfaces

### `Collection`

`Collection` interface that are totally wrapping `Array, Map, Set` in order to handle same signature and immutability.

### `Sequence`

Alias for `Array`. implements `Collection`.

#### `Project`

Alias for `Map`. implements `Collection`.

#### `Address`

Alias for `Set`. implements `Collection`.

## Classes

### `ImmutableSequence`

It does not change itself and its containing elements even if the element is going to be added or changed, will return
new `Sequence` with an added element.

### `MutableSequence`

As usual collection, it can add elements in this without creating a new instance.

### `ImmutableProject`

It does not change itself and its containing elements even if the element is going to be added or changed, will return
new `Project` with an added element.

### `MutableProject`

As usual collection, it can add elements in this without creating a new instance.

### `ImmutableAddress`

It does not change itself and its containing elements even if the element is going to be added or changed, will return
new `Address` with an added element.

### `MutableAddress`

As usual collection, it can add elements in this without creating a new instance.