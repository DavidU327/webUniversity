import { theme } from './src/config/theme/themeVariables';

const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: false,
        },
      },
      ignoreWarnings: [/Failed to parse source map/],
    },
    test: /\.m?jsx?$/,
    // exclude: /node_modules\/@firebase/,
    exclude: /node_modules\/@firebase\/auth/,
    ignoreWarnings: [/Failed to parse source map/],
  },
  jest: {
    configure: (jestConfig) => {
      delete jestConfig.collectCoverageFrom;
      jestConfig.coverageThreshold = {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      };
      return jestConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...theme,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
