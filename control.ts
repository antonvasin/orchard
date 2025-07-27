export function error(name: string) {
  return class extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
}

export const AssertError = error("AssertError");
export function assert<T>(
  val: T | null | undefined,
  msg = `Expected ${val} to be truthy`,
): asserts val is T {
  if (!val) throw new AssertError(msg);
}

export const UnreachableError = error("Unreachable");
export function unreachable() {
  throw new UnreachableError("Unreachable code reached");
}
