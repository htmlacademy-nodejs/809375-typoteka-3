"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const faker = require(`faker`);

const defineModels = require(`../models`);
const Alias = require(`../models/alias`);
const db = require(`../lib/db`);
const {logger} = require(`../logger`);

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
  MAX_ID_LENGTH,
} = require(`../../constants`);

const {DATA_FOLDER} = ProjectPath;

const SENTENCES_FILE = path.resolve(DATA_FOLDER, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_FOLDER, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_FOLDER, `categories.txt`);
const COMMENTS_FILE = path.resolve(DATA_FOLDER, `comments.txt`);
const MIN_ANNOUNCE_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;

const generateUsers = (amount) =>
  [...Array(amount)].map((it, index) => ({
    avatar: `avatar-${index + 1}.png`,
    email: `${faker.internet.email()}`,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    isAuthor: false,
    passwordHash: nanoid(MAX_ID_LENGTH),
  }));

const generateArticles = (amount, {titles, sentences, categories, comments, users}) => {
  return [...Array(amount)].map(() => {
    return {
      title: getRandomItemFrom(titles),
      [`user_id`]: getRandomItemFrom(users).id,
      photo: [`forest@1x.jpg`, `sea@1x.jpg`, `skyscrapper@1x.jpg`][getRandomInt(0, 2)],
      announce: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, MAX_ANNOUNCE_LENGTH))
        .join(` `)
        .substring(0, 250),
      fullText: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, sentences.length))
        .join(` `)
        .substring(0, 500),
      [Alias.CATEGORIES]: [getRandomItemFrom(categories).id],
      [Alias.COMMENTS]: generateCommentsFrom(comments, users, getRandomInt(0, MAX_COMMENTS_AMOUNT)),
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

    const {Article, User, Category} = defineModels(db);

    try {
      await db.sync({force: true});
    } catch (err) {
      logger.error(`DB init error: ${err}`);
      process.exit(1);
    }

    const [categoryModels, userModels] = await Promise.all([
      Category.bulkCreate(categories.map((item) => ({label: item}))),
      User.bulkCreate(generateUsers(5)),
    ]);

    const generatedArticles = generateArticles(amount, {
      titles,
      sentences,
      categories: categoryModels,
      users: userModels,
      comments,
    });

    await Promise.all(generatedArticles.map(async (article) => {
      const createdArticle = await Article.create(article, {include: [Alias.COMMENTS]});
      createdArticle.addCategories(article.categories);
    }));

    console.log(chalk.green(`Success write ${amount} mocks to DB`));
    process.exit(0);
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
  }
};

module.exports = createMocks;
