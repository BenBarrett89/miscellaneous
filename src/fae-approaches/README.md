# FAE Approaches

## Overview

In [FAE (Fate Accelerated Edition), characters must pick values for **Approaches**](https://github.com/ChristopherA/FAE-SRD/blob/master/Fate-Accelerated-SRD-CC.md#approaches) that represent how effective they are at accomplishing tasks in specific ways.

The six [Approaches](https://github.com/ChristopherA/FAE-SRD/blob/master/Fate-Accelerated-SRD-CC.md#choose-your-approach) are:

- Careful
- Clever
- Flashy
- Forceful
- Quick
- Sneaky

For each of these, one will be rated Good (+3), two will be Fair (+2), two will be Average (+1), and one will be Mediocre (+0).

This codebase calculates all 720 permutations for these values and provides functions for selecting a random combination.

## Generating all permutations

These files are checked in, but all permutations can be enumerated and written to files with:

```console
node findAll.js
```

Two files are written;

- [`permutations-by-approach`](./permutations-by-approach.txt) - the approach order is static and the values are permuted
- [`permutations-by-value`](./permutations-by-value.txt) - the value order is static and the approaches are permuted

## Getting a random combination

Two options are given for selecting a random combination, depending on whether the output should keep the approach order or value order static.

### By Approach

```console
node getRandomByApproach.js
```

Produces a random combination in which the approach order is static and the values are permuted (i.e the approaches are in alphabetical order).

e.g

> Careful +3 Clever +0 Flashy +1 Forceful +1 Quick +2 Sneaky +2

### By Value

```console
node getRandomByValue.js
```

Produces a random combination in which the value order is static and the approaches are permuted (i.e the values are in descending order).

e.g

> Quick +3 Sneaky +2 Careful +2 Flashy +1 Forceful +1 Clever +0
