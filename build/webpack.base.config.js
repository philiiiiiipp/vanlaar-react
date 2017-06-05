/* @flow */

import path from 'path';
import options from './args';

// Beware that this BUILD_PATH will be _REMOVED_ before every build
// Check out build.js BEFORE changing this path
export const BUILD_PATH = path.join(__dirname, '../dist');
export const SRC_PATH = path.join(__dirname, '../src');

export const baseConfig = {
  context: SRC_PATH,

  stats: {
    colors: true,
    timings: true
  }
};
