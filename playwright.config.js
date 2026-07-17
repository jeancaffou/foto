const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  outputDir: "./test-results",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:8081",
    trace: "retain-on-failure"
  },
  webServer: {
    command: "node scripts/serve-test-site.js",
    url: "http://127.0.0.1:8081",
    reuseExistingServer: false,
    timeout: 120000
  },
  projects: [
    { name: "reference", use: { ...devices["Desktop Chrome"], viewport: { width: 1086, height: 900 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 820, height: 1180 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium" } }
  ]
});
