/* @flow */

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import { baseConfig, BUILD_PATH } from './webpack.base.config';

const nodeModules = {};
fs.readdirSync('node_modules')
.filter((x) => {
  return ['.bin'].indexOf(x) === -1;
})
.forEach((mod) => {
  nodeModules[mod] = `commonjs ${mod}`;
});

const commonPlugins = [ new webpack.ProvidePlugin({ log: 'logger' }) ]

export const serverConfig = {
  ...baseConfig,
  entry: './server.js',
  target: 'node',
  output: {
    path: BUILD_PATH,
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader?cacheDirectory'
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    ...commonPlugins,
    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          SERVER_NAME: JSON.stringify(process.env.SERVER_NAME)
        },
        __DEVELOPMENT__: false
      }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    alias: {
      logger: `${path.resolve(__dirname, 'Logger')}`
    }
  },
  externals: [
    nodeModules
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
};

export const serverDevConfig = {
  ...serverConfig,
  plugins: [
    ...commonPlugins,
    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        },
        __DEVELOPMENT__: true
      })
  ],
  devtool: 'cheap-module-source-map'
};
