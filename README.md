# Lluvia

This package enables you to use things in one class instance and the same interface.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Requisite

```
> node -v
v12.0.0
```

### My environment

```
> node -v
v15.5.0

> npm -v
7.3.0

> yarn -v
1.22.20
```

## Interfaces

### Collection

`Collection` interface that are totally wrapping `Array, Map, Set` in order to handle same signature and immutability.

### Sequence

Alias for `Array`. Implemented `Collection`.

#### Project

Alias for `Map`. Implemented `Collection`.

#### Address

Alias for `Set`. Implemented `Collection`.

## Classes

### Sequence

* `ImmutableSequence`
  
  It does not change itself and its containing elements even if the element is going to be added or changed, will return new `Sequence` with an added element.

* `MutableSequence`
  
  As usual collection, it can add elements in this without creating a new instance.

#### Project

* `ImmutableProject`

  It does not change itself and its containing elements even if the element is going to be added or changed, will return new `Project` with an added element.

* `MutableProject`

  As usual collection, it can add elements in this without creating a new instance.

#### Address

* `ImmutableAddress`

  It does not change itself and its containing elements even if the element is going to be added or changed, will return new `Address` with an added element.

* `MutableAddress`

  As usual collection, it can add elements in this without creating a new instance.

## Conventional commit

```
git cz
```

## License

[MIT](LICENSE)
