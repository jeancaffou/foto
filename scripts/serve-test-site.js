"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "_site_test");

fs.rmSync(output, { recursive: true, force: true });

const executable = process.platform === "win32" ? "npx.cmd" : "npx";
const eleventy = spawn(executable, ["eleventy", "--output=_site_test", "--serve", "--port=8081"], {
  cwd: root,
  stdio: "inherit"
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => eleventy.kill(signal));
}

eleventy.once("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
