import { defineConfig, devices } from '@playwright/test';

const IS_BS = process.env.BROWSERSTACK === 'true';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: IS_BS ? 1 : 0,
  workers: IS_BS ? 2 : 1,
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },
  projects: IS_BS
    ? [
        // BrowserStack mode — SDK handles browser/OS matrix via browserstack.yml
        {
          name: 'browserstack',
          use: {},
        },
      ]
    : [
        // Local mode
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
      ],
});
