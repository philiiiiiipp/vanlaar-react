/* @flow */

import rimraf from 'rimraf';
import options from './args';

import { BUILD_PATH } from './webpack.base.config';

if (options.development || !options.production) {
  process.env.BABEL_ENV = process.env.NODE_ENV = 'development';
} else if (options.production) {
  process.env.BABEL_ENV = process.env.NODE_ENV = 'production';
}

// Removing BUILD_PATH (rm -rf BUILD_PATH)
rimraf(BUILD_PATH, { disableGlob: true }, () => {
  if (options.externalDevelopment) {
    require('./buildExternal').run();
  } else if(options.development) {
    require('./buildDev').run();
  } else {
    require('./buildRelease').run();
  }
});
