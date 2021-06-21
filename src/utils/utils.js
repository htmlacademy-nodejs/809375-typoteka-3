"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const fsSync = require(`fs`);
const path = require(`path`);
const faker = require(`faker`);
const express = require(`express`);
const {MAX_ID_LENGTH} = require(`../constants`);
const {nanoid} = require(`nanoid`);

const getRandomInt = (min, max) => {
  const minimal = Math.ceil(min);
  const maximal = Math.floor(max);

  return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
};

const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[randomPosition]] = [shuffledArray[randomPosition], shuffledArray[i]];
  }

  return shuffledArray;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return removeBlankLines(content);
  } catch (err) {
    return console.error(chalk.red(err));
  }
};

const removeBlankLines = (string) => string.trim().split(`\n`);

const generateCommentsFrom = (array, count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    const comment = {
      text: getRandomItemFrom(array),
    };

    comments.push(comment);
  }

  return comments;
};

const getFixturePath = (fileName) => path.resolve(__dirname, `..`, `..`, `__fixtures__`, fileName);

const getFixtureContent = (fileName) => fsSync.readFileSync(getFixturePath(fileName), `utf-8`).trim();

const createTestServer = (route, controller, db, ArticleService, CommentService) => {
  const app = express();
  app.use(express.json());

  if (CommentService) {
    app.use(route, controller(new ArticleService(db), new CommentService(db)));
  }

  app.use(route, controller(new ArticleService(db)));

  return app;
};

const generateUsers = (amount) =>
  [...Array(amount)].map((it, index) => ({
    avatar: `avatar-${index + 1}.png`,
    email: `${faker.internet.email()}`,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAuthor: false,
    password: nanoid(MAX_ID_LENGTH),
  }));

module.exports = {
  createTestServer,
  generateCommentsFrom,
  getFixtureContent,
  getRandomInt,
  getRandomItemFrom,
  readContent,
  removeBlankLines,
  generateUsers,
  shuffleArray,
};
