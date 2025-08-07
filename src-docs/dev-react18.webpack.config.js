// Copyright OpenSearch Contributors
// SPDX-License-Identifier: Apache-2.0

// This file extends dev.webpack.config.js to use React 18 aliases
const path = require('path');

module.exports = async function () {
  const devConfig = await require('./dev.webpack.config.js')();

  return {
    ...devConfig,
    resolve: {
      ...devConfig.resolve,
      alias: {
        // Alias React 16 imports to React 18 packages for development
        react: 'react-18',
        'react-dom': 'react-dom-18',
        '@types/react': '@types/react-18',
        '@types/react-dom': '@types/react-dom-18',
        // Override our shim to the actual react 18 implementation
        [path.resolve(
          __dirname,
          '../src/services/react-dom-client.ts'
        )]: 'react-dom-18/client',
      },
    },
  };
};
