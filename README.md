# ts-utils

Collection of TypeScript utils for everyday use. Written in Deno to be simple
and without external dependencies. These functions are small and don't share too
much code so they can easily be extracted into codebase or modified.

This is eclectic collection of code that don't follow coherent topic. It should
be treated not as "utility library" but more as "./utils from legacy codebase".

More details and reasoning can be found in comments and benchmark files.

NPM/Node treated as necessary evil so this code is compiled with `dnt` into ESM
modules.

## Functions

- [Object functions](./obj.ts)
  - [x] `flatten`
  - [x] `camelizeKeys`
  - [x] `walkDeep`
- [Number](./number.ts)
  - [x] `random`
  - [x] `lerp`
  - [x] `clamp`
  - [x] `range`
  - [x] `invlerp`
  - [x] `distance`
  - [x] `collideRect`
- [String](./string.ts)
  - [x] `camelize`
  - [x] `toSlug`
  - [x] `hammingDistance`
  - [x] `truncate`
- [Date & Time](./time.ts)
  - [x] `getSecondsDiff`
- [Env variables](./env.ts)
  - [x] `validateSecret`
- [Hashing](./hash.ts)
  - [x] `djb2`
  - [x] `assignToBucket`
- [Containers (Docker)](./oci.ts)
  - [x] `startDocker`
- [HTTP](./http.ts)
  - [x] `getClient`
- [Localisation](./l18n.ts)
  - [x] `currency`
- [Async](./async.ts)
  - [x] `throttle`
  - [x] `debounce`
  - [x] `wait`
  - [x] `timeout`
  - [ ] `circuitBreaker`
- [Control](./control.ts)
  - [x] `assert`
  - [x] `unreachable`

## Docs

- [How to use private modules in Deno](https://deno.com/manual@v1.15.2/linking_to_external_code/private)
- [How to publish NPM packages with Deno](https://deno.com/blog/dnt-oak)
