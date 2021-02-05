"use strict";

const chalk = require(`chalk`);
const path = require(`path`);
const fs = require(`fs`).promises;
const express = require(`express`);

const FILE_NAME = path.resolve(__dirname, `../../..`, `mocks.json`);
const PORT = 3001;

const app = express();

app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const content = await fs.readFile(FILE_NAME, `utf8`);

    res.send(content);
  } catch (error) {
    res.send([]);
  }
});

module.exports = (port = PORT) => {
  app.listen(port, (err) => {
    if (err) {
      return console.error(`Server creation error`, err);
    }

    return console.info(chalk.green(`Waiting for connections on ${port}`));
  });
};
