const { spawn } = require("node:child_process");

require("./ensure-browserstack-playwright-compat");

process.env.BROWSERSTACK = "true";
const runnerPath = require.resolve("browserstack-node-sdk/src/bin/runner.js");

const child = spawn(
  process.execPath,
  [runnerPath, "playwright", ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: process.env,
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
