"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const fs = require(`fs`).promises;

const {
  formatDate,
  generatePastDate,
  getRandomInt,
  getRandomItemFrom,
  shuffleArray,
  readContent,
  generateCommentsFrom,
} = require(`../../utils`);

const {
  MAX_ID_LENGTH,
  MAX_COMMENTS_AMOUNT,
  ProjectPath,
} = require(`../../constants`);

const {DATA_FOLDER, ROOT_FOLDER} = ProjectPath;

const MOCK_FILE = path.resolve(ROOT_FOLDER, `mocks.json`);
const SENTENCES_FILE = path.resolve(DATA_FOLDER, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_FOLDER, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_FOLDER, `categories.txt`);
const COMMENTS_FILE = path.resolve(DATA_FOLDER, `comments.txt`);
const MIN_ANNOUNCE_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_MONTH_PAST = 3;

const generateOffers = (count, {titles, sentences, categories, comments}) => {
  return [...Array(count)].map(() => {
    return {
      id: nanoid(MAX_ID_LENGTH),
      title: getRandomItemFrom(titles),
      createdDate: formatDate(generatePastDate(getRandomInt(0, MAX_MONTH_PAST))),
      announce: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, MAX_ANNOUNCE_LENGTH))
        .join(` `),
      fullText: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, sentences.length))
        .join(` `),
      category: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
      comments: generateCommentsFrom(comments, getRandomInt(0, MAX_COMMENTS_AMOUNT)),
    };
  });
};

const createMocks = async (count) => {
  try {
    const [titles, sentences, categories, comments] = await Promise.all([
      readContent(TITLES_FILE),
      readContent(SENTENCES_FILE),
      readContent(CATEGORIES_FILE),
      readContent(COMMENTS_FILE),
    ]);

    const offers = generateOffers(count, {
      titles,
      sentences,
      categories,
      comments,
    });
    const content = JSON.stringify(offers);

    await fs.writeFile(MOCK_FILE, content);
    console.log(chalk.green(`Success write ${count} mocks to ${MOCK_FILE}`));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red(err));
  }
};
module.exports = createMocks;
