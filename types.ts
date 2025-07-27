/** Enables type branding to distinguish similarly-shaped types */
export type Brand<K, T> = K & { __type: T };

/** Makes field K of type T required */
export type WithExisting<T, K extends keyof T> =
  & T
  & { [P in K]-?: NonNullable<T[P]> };

/**
 * A generic type for strongly typing custom events with their targets
 * @template T - The type of the event target (extends EventTarget)
 * @template D - The type of the detail payload for the custom event
 */
export type TypedEvent<T extends EventTarget, D = unknown> = CustomEvent<D> & {
  target: T;
};
