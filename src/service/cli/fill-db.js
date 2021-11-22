"use strict";

const path = require(`path`);
const chalk = require(`chalk`);

const db = require(`../lib/db`);
const {logger} = require(`../logger`);
const initDB = require(`../lib/init-db`);
const {generateUsers} = require(`../../utils/utils`);

const {
  getRandomInt,
  getRandomItemFrom,
  shuffleArray,
  readContent,
  generateCommentsFrom,
} = require(`../../utils/utils`);

const {
  MAX_COMMENTS_AMOUNT,
  ProjectPath,
} = require(`../../constants`);

const {DATA_FOLDER} = ProjectPath;

const SENTENCES_FILE = path.resolve(DATA_FOLDER, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_FOLDER, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_FOLDER, `categories.txt`);
const COMMENTS_FILE = path.resolve(DATA_FOLDER, `comments.txt`);
const MIN_ANNOUNCE_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;

const generateArticles = (amount, {titles, sentences, categories, comments}) => {
  return [...Array(amount)].map(() => {
    return {
      title: getRandomItemFrom(titles),
      photo: [`forest@2x.jpg`, `sea@2x.jpg`, `skyscraper@2x.jpg`][getRandomInt(0, 2)],
      announce: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, MAX_ANNOUNCE_LENGTH))
        .join(` `)
        .substring(0, 250),
      fullText: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, sentences.length))
        .join(` `)
        .substring(0, 500),
      categories: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
      comments: generateCommentsFrom(comments, getRandomInt(0, MAX_COMMENTS_AMOUNT)),
    };
  });
};

const createMocks = async (amount) => {
  try {
    logger.info(`Trying to connect to database...`);
    await db.authenticate();
    logger.info(`Connection to database established`);
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
  }

  try {
    const [titles, sentences, categories, comments] = await Promise.all([
      readContent(TITLES_FILE),
      readContent(SENTENCES_FILE),
      readContent(CATEGORIES_FILE),
      readContent(COMMENTS_FILE),
    ]);

    const articles = generateArticles(amount, {
      titles,
      sentences,
      categories,
      comments,
    });

    const users = generateUsers(5);

    await initDB(db, {
      articles,
      categories,
      users,
    });

    console.log(chalk.green(`Success write ${amount} mocks to DB`));
    process.exit(0);
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
  }
};

module.exports = createMocks;
