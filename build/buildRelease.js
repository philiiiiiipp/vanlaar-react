/* @flow */

import webpack from 'webpack';
import { serverConfig } from './webpack.server.config';
import { clientConfig } from './webpack.client.config';


module.exports.run = () => {
  console.log('RELEASE BUILD');

  const bundler = webpack(clientConfig);
  bundler.run((err) => {
    if (err) console.log(err);
    console.log('Client bundle - DONE');

    webpack(serverConfig).run((err) => {
      if (err) console.log(err);
      console.log('Server bundle - DONE');
    });
  });
};
