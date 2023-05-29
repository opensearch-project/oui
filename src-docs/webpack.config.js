/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const babelConfig = require('./.babelrc.js');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const { NODE_ENV, CI, WEBPACK_SERVE } = process.env;

const isDevelopment = WEBPACK_SERVE === 'true' && CI == null;
const isProduction = NODE_ENV === 'production';
const isPuppeteer = NODE_ENV === 'puppeteer';

function employCache(loaders) {
  if (isDevelopment && !isPuppeteer) {
    return [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.join(__dirname, '..', '.cache-loader'),
        },
      },
      ...loaders,
    ];
  }

  return loaders;
}

const webpackConfig = {
  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',

  entry: {
    bundle: './index.js',
  },

  context: path.resolve(__dirname, 'src'),

  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: `[name]${isProduction ? '.min' : ''}.js`,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      fs: false,
    },
  },

  resolveLoader: {
    alias: {
      'prop-loader': path.resolve(
        __dirname,
        '../scripts/loaders/prop-loader.js'
      ),
    },
  },

  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /\.(js|tsx?)$/,
        use: employCache([
          {
            loader: 'babel-loader',
            options: { babelrc: false, ...babelConfig },
          },
        ]),
        exclude: [/node_modules/, /packages(\/|\\)react-datepicker/],
      },
      {
        test: /\.scss$/,
        use: employCache([
          {
            loader: 'style-loader',
            options: { injectType: 'lazySingletonStyleTag' },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: employCache(['style-loader', 'css-loader']),
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)(\?|$)/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'images/[contenthash]-[name].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      cache: true,
      showErrors: true,
    }),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),

    new NodePolyfillPlugin(),
    // run TypeScript during webpack build
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: { configFile: path.resolve(__dirname, '..', 'tsconfig.json') },
    //   async: false, // makes errors more visible, but potentially less performant
    // }),
  ],

  devServer: isDevelopment
    ? {
        static: {
          directory: path.resolve(__dirname, 'build'),
          // prevent file watching while running on CI
          // /app/ represents the entire docker environment
          watch: isPuppeteer ? { ignored: '**/*' } : undefined,
        },
        host: '0.0.0.0',
        port: 8030,
        allowedHosts: 'all',
        historyApiFallback: true,
      }
    : undefined,
};

module.exports = webpackConfig;
