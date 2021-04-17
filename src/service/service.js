"use strict";

const commander = require(`commander`);
const chalk = require(`chalk`);

const packageJsonFile = require(`../../package.json`);
const generateOffers = require(`./cli/fill-db`);
const serverCLI = require(`./cli/server`);

const MAX_PUBLICATION_AMOUNT = 1000;
const DEFAULT_PUBLICATION_AMOUNT = 1;

const handleServerAction = (value) => {
  if (typeof value === `boolean`) {
    serverCLI();
  } else {
    serverCLI(parseInt(value, 10));
  }
};

const handleGenerateAction = (value) => {
  const count = parseInt(value, 10);

  if (count > MAX_PUBLICATION_AMOUNT) {
    console.info(chalk.blue(`No more than 1000 ads.`));
    process.exit(1);
  }

  if (typeof value === `boolean`) {
    generateOffers(DEFAULT_PUBLICATION_AMOUNT);
  } else {
    generateOffers(count);
  }
};

commander
  .version(packageJsonFile.version, `-v, --version`)
  .option(`-f, --fillDb [count]`, `fill DB`)
  .option(`-s, --server [port]`, `create server on specific port`)
  .action(({fillDb, server}) => {
    if (process.argv.length === 2) {
      commander.help();
    }

    if (server) {
      handleServerAction(server);
    }

    if (fillDb) {
      handleGenerateAction(fillDb);
    }
  })
  .parse(process.argv);
