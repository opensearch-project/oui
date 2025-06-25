// Copyright OpenSearch Contributors
// SPDX-License-Identifier: Apache-2.0

// This file is a wrapper for webpack.config.js that supports async/await solely to
// support retrieving an availble port.
module.exports = async function () {
  const getPort = require('get-port');
  const port = await getPort({
    port: getPort.makeRange(8030, 8130),
    host: '0.0.0.0',
  });

  const webpackConfig = require('./webpack.config.js');
  return {
    ...webpackConfig,
    devServer: {
      ...webpackConfig.devServer,
      port,
    },
  };
};
