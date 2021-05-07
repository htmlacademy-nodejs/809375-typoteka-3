"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const fsSync = require(`fs`);
const path = require(`path`);
const express = require(`express`);

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

const generatePastDate = (pastMonthAmount) => {
  const currentDate = new Date();

  return new Date(currentDate.setMonth(currentDate.getMonth() - pastMonthAmount));
};

const formatDate = (date) => {
  return date
    .toISOString()
    .replace(`T`, ` `)
    .substr(0, 19);
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

const createTestServer = (route, controller, mockData, ArticleService, CommentService) => {
  const app = express();
  app.use(express.json());

  if (CommentService) {
    app.use(route, controller(new ArticleService(mockData), new CommentService(mockData)));
  }

  app.use(route, controller(new ArticleService(mockData)));

  return app;
};

module.exports = {
  createTestServer,
  formatDate,
  generateCommentsFrom,
  generatePastDate,
  getFixtureContent,
  getRandomInt,
  getRandomItemFrom,
  readContent,
  removeBlankLines,
  shuffleArray,
};
