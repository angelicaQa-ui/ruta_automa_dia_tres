import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [['html']], // Generación del HTML Report
  use: {
    trace: 'on', // Activación del Trace
    screenshot: 'only-on-failure', // Screenshots solo ante error
  },
  projects: [
    {
      name: 'Google Chrome', // Ejecución Chrome
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
//    {
  //    name: 'Firefox', // Ejecución Firefox
 //     use: { ...devices['Desktop Firefox'] },
//    },
  ],
});


