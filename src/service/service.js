"use strict";

const commander = require(`commander`);
const chalk = require(`chalk`);

const packageJsonFile = require(`../../package.json`);
const generateOffers = require(`./cli/generate`);

const MAX_PUBLICATION_AMOUNT = 1000;

commander
  .version(packageJsonFile.version, `-v, --version`)
  .option(`-g, --generate [count]`, `generates mocks.json files`, `1`)
  .action(({generate}) => {
    if (process.argv.length === 2) {
      commander.help();
    }

    const count = parseInt(generate, 10);

    if (count > MAX_PUBLICATION_AMOUNT) {
      console.info(chalk.blue(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    generateOffers(count);
  })
  .parse(process.argv);
