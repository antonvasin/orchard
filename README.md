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
- [Date & Time](./time.ts)
  - [x] `getSecondsDiff`
- [String operations](./string.ts)
  - [x] `camelize`
  - [ ] `envCase`
- [Env variables](./env.ts)
  - [x] `validateSecret`
- [Hashing](./hash.ts)
  - [x] `djb2`
  - [x] `assignToBucket`
- [Containers (Docker)](./oci.ts)
  - [x] `startDocker`
- [HTTP](./http.ts)
  - [x] `getClient`
- Behaviour
  - [ ] `throttle`
  - [ ] `debounce`
  - [ ] `timeout`
  - [ ] `circuitBreaker`

## Docs

- [How to use private modules in Deno](https://deno.com/manual@v1.15.2/linking_to_external_code/private)
- [How to publish NPM packages with Deno](https://deno.com/blog/dnt-oak)
