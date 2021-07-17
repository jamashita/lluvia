# Lluvia/Address

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/lluvia/actions/workflows/ci.yml/badge.svg)](https://github.com/jamashita/lluvia/actions/workflows/ci.yml)

## Interfaces

#### `Address`

Alias for `Set`. implements `Collection`.

## Classes

### `ImmutableAddress`

It does not change itself and its containing elements even if the element is going to be added or changed, will return
new `Address` with an added element.

### `MutableAddress`

As usual collection, it can add elements in this without creating a new instance.