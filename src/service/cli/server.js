"use strict";

const express = require(`express`);
const pino = require(`express-pino-logger`);

const initApiRouter = require(`../api`);
const {API_DEFAULT_PORT} = require(`../../constants`);
const {logger} = require(`../logger`);
const {initDB} = require(`../lib/db`);

module.exports = async (port = API_DEFAULT_PORT) => {
  try {
    const db = initDB();
    logger.info(`Connecting to DB...`);
    await db.authenticate();
    logger.info(`Connection with DB is established.`);
  } catch (error) {
    logger.error(`Couldn't connect to DB: ${error}`);
    process.exitCode(1);
  }

  const app = express();
  const apiRoute = await initApiRouter();

  app.use(express.json());
  app.use(pino({logger}));
  app.use(`/api`, apiRoute);

  app.listen(port, (err) => {
    if (err) {
      return logger.error(`SERVER: Server creation error ${err}`);
    }

    return console.info(`Waiting for connections on ${port}`);
  });
};
