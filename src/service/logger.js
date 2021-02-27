"use strict";

const pino = require(`pino`);

const logger = pino({
  name: `express-service`,
  level: process.env.LOGGER_LEVEL || `info`,
});

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
