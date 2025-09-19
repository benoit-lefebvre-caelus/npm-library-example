import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    },
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    }
  }
});
