/* @flow */

import winston from 'winston';
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: () => {
        return `[ ${new Date().toUTCString()} ]`;
      },
      colorize: 'all'
    })
  ]
});

module.exports = logger;
