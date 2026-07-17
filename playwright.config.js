const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:8080",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npx eleventy --serve --port=8080",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    { name: "reference", use: { ...devices["Desktop Chrome"], viewport: { width: 1086, height: 900 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } }
  ]
});
