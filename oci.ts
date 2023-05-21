async function cmd(cmd: string[]) {
  const proc = Deno.run({
    cmd,
    "stdout": "piped",
    stderr: "piped",
  });

  const [status, stdout, stderr] = await Promise.all([
    proc.status(),
    proc.output(),
    proc.stderrOutput(),
  ]);
  proc.close();

  const decoder = new TextDecoder();

  if (!status.success) {
    throw Error(decoder.decode(stderr));
  }

  const output = decoder.decode(stdout).trim();

  return { output, code: status.code };
}

const dockerCmd = "docker";

/** Check if `docker` CLI is available */
export async function isDocker() {
  return (await cmd([dockerCmd, "info"])).code === 0;
}

/** Start container and wait for it to become healthy */
export async function startDocker(tag: string, args: string[], debug = false) {
  let cmdArgs = [dockerCmd, "run", "-d", "--rm", ...args];

  if (debug) {
    cmdArgs = [...cmdArgs, "--env", "DENO_LOG_DEBUG=true"];
  }

  cmdArgs = [...cmdArgs, tag];

  const { output: id } = await cmd(cmdArgs);

  let retries = 10;
  while (retries >= 0) {
    if (retries === 0) {
      throw Error("Couldn’t start container");
    }

    const { output } = await cmd([
      dockerCmd,
      "inspect",
      "--format",
      "{{json .State.Health.Status }}",
      id,
    ]);
    const isHealthy = output.match(/healthy/);

    if (isHealthy) {
      break;
    }

    console.debug("Waiting for app to start…");
    retries--;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const logs = Deno.run({ cmd: [dockerCmd, "logs", "-f", id] });

  const stop = async () => {
    logs.kill("SIGINT");
    logs.close();
    await cmd([dockerCmd, "stop", id]);
  };

  return { id, stop };
}
