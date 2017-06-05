/* @flow */

import commandLineArgs from 'command-line-args';

const options = commandLineArgs([
  { name: 'development', type: Boolean },
  { name: 'production', type: Boolean },
  { name: 'externalDevelopment', type: Boolean }
]);

if (options.development && options.production) {
  console.error('Development and release build cannot be combined!');
  process.exit(1);
} else if (!options.development && !options.production) {
  /* Defaulting to dev mode */
  options.development = true;
}

export default options;
