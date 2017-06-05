/* @flow */

import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { baseConfig, BUILD_PATH, SRC_PATH } from './webpack.base.config';

const commonLoaders = [
  {
    test: /\.jsx?$/,
    loaders: [
      'babel-loader?cacheDirectory'
    ],
    exclude: /node_modules/,
    include: SRC_PATH
  },
  {
    test: /\.(ttf|eot|svg|png|jpg)(\?[\s\S]+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader'
  },
  {
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader',
      'postcss-loader'
    ]
  },
];

export const clientConfig = {
  ...baseConfig,
  entry: [ 'babel-polyfill', './client/entry.js' ],
  target: 'web',
  devtool: 'hidden-source-map',
  output: {
    path: path.join(BUILD_PATH, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
      __DEVELOPMENT__: false
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
          'postcss-loader!' +
          'sass-loader'
        )
      },
      ...commonLoaders
    ]
  }
};

export const clientDevConfig = {
  ...clientConfig,
  devtool: 'cheap-module-source-map',
  performance: {
    hints: 'error', // enum
    maxAssetSize: 200000000, // int (in bytes),
    maxEntrypointSize: 400000000, // int (in bytes)
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/entryHMR.js'
  ],
  plugins: [
    new webpack.DefinePlugin(
      {
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        },
        __DEVELOPMENT__: true
      }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          { loader: 'style-loader', options: { insertAt: 'top' } },
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          { loader: 'sass-loader' },

        ]
      },
      ...commonLoaders
    ]
  }
};
