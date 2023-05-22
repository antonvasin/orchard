# ts-utils

Collection of TypeScript utils for everyday use. Written in Deno to be simple
and without external dependencies. These functions are small and don't share too
much code so they can easily be extracted into codebase or modified.

This is eclectic collection of code that don't follow coherent topic. It should
be treated not as "3rd util package" but more as "utilities from legacy
codebase".

## Functions

- [Object functions](./obj.ts)
  - [x] `flatten`
  - [ ] `walk`
- [Date & Time](./time.ts)
  - [x] `getSecondsDiff`
- [String operations](./string.ts)
  - [x] `camelize`
  - [ ] `envCase`
  - [ ] `capitalise`
- [Env variables](./env.ts)
  - [x] `validateSecret`
- [Hashing](./hash.ts)
  - [x] `djb2`
  - [x] `assignToBucket`
- [Containers (Docker)](./oci.ts)
  - [x] `startDocker`
- HTTP
  - [ ] `apiClient`
- Resilience
  - [ ] `throttle`
  - [ ] `debounce`
  - [ ] `timeout`
  - [ ] `circuitBreaker`

## Docs

- [How to use private modules](https://deno.com/manual@v1.15.2/linking_to_external_code/private)
