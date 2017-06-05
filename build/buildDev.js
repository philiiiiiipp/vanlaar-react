/* @flow */

import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import nodemon from 'nodemon';

import WebpackDevServer from 'webpack-dev-server';
import { serverDevConfig } from './webpack.server.config';
import { clientDevConfig } from './webpack.client.config';

const serverPath = path.join(serverDevConfig.output.path, serverDevConfig.output.filename);
const env = { NODE_ENV: 'development' };

module.exports.run = () => {
  console.log('DEV _ BUILD');

  const configs = [ serverDevConfig ];
  const bundler = webpack(configs);
  let server;

  bundler.watch({
    aggregateTimeout: 300
  }, (err) => {
    if (err) console.log(err);
  });

  setTimeout(function () {
    nodemon({ script: serverPath, env });

    nodemon.on('start', function () {
      console.log('App has started');
    }).on('quit', function () {
      console.log('App has quit');
    }).on('restart', function (files) {
      console.log('App restarted due to: ', files);
    });
  }, 5000);

  new WebpackDevServer(webpack(clientDevConfig), {
    publicPath: clientDevConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: "none",
    noInfo: true,
    disableHostCheck: true,
    proxy: {
      '**': 'http://localhost:3000'
    }
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.info('Dev proxy listening at http://localhost:8080/');
  });
};
