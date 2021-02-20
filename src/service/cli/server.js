"use strict";

const chalk = require(`chalk`);
const express = require(`express`);

const initApiRouter = require(`../api`);

const PORT = 3001;


module.exports = async (port = PORT) => {
  const app = express();

  const apiRoute = await initApiRouter();

  app.use(express.json());
  app.use(`/api`, apiRoute);

  app.listen(port, (err) => {
    if (err) {
      return console.error(chalk.red(`Server creation error ${err}`));
    }

    return console.info(chalk.green(`Waiting for connections on ${port}`));
  });
};
