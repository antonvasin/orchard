import { wait } from "./async.ts";
import { assert } from "./control.ts";

/**
 * Start container and wait for it to become healthy
 *
 * @param tag - Docker tag to run
 * @param [args] - `docker run` arguments
 * @param [dockerCmd] - Command to run (default: `docker`)
 *
 * @example
 * ```ts
 * const { id, stop } = await startAndWait('docker/getting-started:latest',
 * ['-e', 'MY_ENV_VARIABLE=123foobar321']);
 * await stop();
 * ```
 */
export async function startAndWait(
  tag: string,
  args: string[] = [],
  dockerCmd = "docker",
) {
  const decoder = new TextDecoder();

  const { stdout: idOut } = await (new Deno.Command(dockerCmd, {
    args: ["run", "-d", "--rm", ...args, tag],
    stdout: "piped",
    stderr: "piped",
  })).output();

  const id = decoder.decode(idOut);

  let retries = 10;
  while (retries >= 0) {
    if (retries === 0) {
      throw Error("Couldn’t start container");
    }

    const { stdout: statusOut } = await (new Deno.Command(dockerCmd, {
      args: [
        "inspect",
        "--format",
        "{{json .State.Health.Status }}",
        id,
      ],
      stdout: "piped",
      stderr: "piped",
    })).output();
    const output = decoder.decode(statusOut);
    const isHealthy = output.match(/healthy/);

    if (isHealthy) {
      break;
    }

    console.debug("Waiting for app to start…");
    retries--;
    await wait(1000);
  }

  const logs = Deno.run({ cmd: [dockerCmd, "logs", "-f", id] });

  const stop = async () => {
    logs.kill("SIGINT");
    logs.close();
    await (new Deno.Command(dockerCmd, { args: ["stop"], stdout: "piped" }))
      .output();
  };

  return { id, stop };
}

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

  assert(envSecret, errMessage);

  return envSecret;
}
