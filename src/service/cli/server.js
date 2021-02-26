"use strict";

const express = require(`express`);
const pino = require(`express-pino-logger`);

const initApiRouter = require(`../api`);
const {logger} = require(`../logger`);

const PORT = 3001;

module.exports = async (port = PORT) => {
  const app = express();
  const apiRoute = await initApiRouter();

  app.use(express.json());
  app.use(pino({logger}));
  app.use(`/api`, apiRoute);

  app.listen(port, (err) => {
    if (err) {
      return logger.error(`SERVER: Server creation error ${err}`);
    }

    return logger.debug(`Waiting for connections on ${port}`);
  });
};
