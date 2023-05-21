/** Checks presense of a ENV secrets, throws if secret is not found.
 * Used to check for secrets at startup.
 *
 * @example
 * const token = validateSecret('SERVICE_TOKEN');
 *
 * function useToken() {
 *    const sdk = createSDK(token);
 * }
 */
export function validateSecret<T extends string>(
  secret: T,
  errMessage = `Secret ${secret} is not specified.`,
) {
  const envSecret = Deno.env.get(secret);

  if (!envSecret) {
    throw new Error(errMessage);
  }

  return envSecret;
}
