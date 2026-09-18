import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 60_000,

  expect: {

    timeout: 5_000,

  },

  reporter: 'html',

  use: {

    baseURL: 'https://www.saucedemo.com',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
    launchOptions:{
      slowMo:500,
    },

  },

  projects: [

    {

      name: 'chromium', //ใช้ตัวนี้เท่านั้น

      use: {

        ...devices['Desktop Chrome']

      },

    },

  ],

});