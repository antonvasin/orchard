export function assert(cond: unknown, msg = "Assertion error"): asserts cond {
  if (!cond) {
    throw new Error(msg);
  }
}

export function unreachable() {
  throw new Error("unreachable");
}
