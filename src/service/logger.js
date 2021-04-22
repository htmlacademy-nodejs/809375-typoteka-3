"use strict";

const pino = require(`pino`);
const path = require(`path`);

const {Env, ProjectPath} = require(`../constants`);

const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;
const LOG_FILE = path.resolve(ProjectPath.ROOT_FOLDER, `logs/api.log`);

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode,
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
