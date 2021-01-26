"use strict";

const path = require(`path`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  formatDate,
  generatePastDate,
  getRandomInt,
  getRandomItemFrom,
  shuffleArray,
  readContent,
} = require(`../../utils`);

const ROOT_PATH = path.resolve(__dirname, `../../../`);
const MOCK_FILE = path.resolve(ROOT_PATH, `mocks.json`);
const SENTENCES_FILE = path.resolve(ROOT_PATH, `data/sentences.txt`);
const TITLES_FILE = path.resolve(ROOT_PATH, `data/titles.txt`);
const CATEGORIES_FILE = path.resolve(ROOT_PATH, `data/categories.txt`);
const MIN_ANNOUNCE_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_MONTH_PAST = 3;

const generateOffers = (count, {titles, sentences, categories}) => {
  return [...Array(count)].map(() => {
    return {
      title: getRandomItemFrom(titles),
      createdDate: formatDate(generatePastDate(getRandomInt(0, MAX_MONTH_PAST))),
      announce: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, MAX_ANNOUNCE_LENGTH))
        .join(` `),
      fullText: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, sentences.length))
        .join(` `),
      category: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
    };
  });
};

const createMocks = async (count) => {
  try {
    const [titles, sentences, categories] = await Promise.all([
      readContent(TITLES_FILE),
      readContent(SENTENCES_FILE),
      readContent(CATEGORIES_FILE),
    ]);

    const offers = generateOffers(count, {
      titles,
      sentences,
      categories,
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
