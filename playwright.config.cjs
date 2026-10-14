const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(__dirname, '.playwright-browsers');
module.exports = defineConfig({
  testDir: './e2e',
  testMatch: '**/compatibility.spec.cjs',
  timeout: 30000,
  expect: { timeout: 6000 },
  workers: 2,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'browser-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4173', launchOptions: { timeout: 15000 }, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'node scripts/serve-test-build.cjs', url: 'http://127.0.0.1:4173', reuseExistingServer: process.env.E2E_REUSE_SERVER === 'true' },
  projects: [
    { name: 'windows-chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'windows-edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
    { name: 'windows-firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'] } },
    { name: 'android-pixel-emulated', testMatch: ['**/compatibility.spec.cjs', '**/android-touch.spec.cjs'], use: { ...devices['Pixel 7'], browserName: 'chromium' } },
    { name: 'ios-iphone-emulated', use: { ...devices['iPhone 13'], browserName: 'webkit' } },
    { name: 'ios-small-emulated', use: { ...devices['iPhone SE'], browserName: 'webkit' } },
    { name: 'ipad-emulated', use: { ...devices['iPad (gen 7)'], browserName: 'webkit' } },
  ],
});
