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
} = require(`../../utils`);

const FILE_NAME = path.resolve(__dirname, `../../../`, `mocks.json`);
const MIN_ANNOUNCE_LENGTH = 1;
const MAX_ANNOUNCE_LENGTH = 5;
const MAX_MONTH_PAST = 3;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const generateOffers = (count, {titles, sentences, categories}) => {
  return [...Array(count)].map(() => {
    return {
      title: getRandomItemFrom(titles),
      createdDate: formatDate(generatePastDate(getRandomInt(0, MAX_MONTH_PAST))),
      announce: shuffleArray(sentences)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, MAX_ANNOUNCE_LENGTH))
        .join(` `),
      fullText: shuffleArray(SENTENCES)
        .slice(0, getRandomInt(MIN_ANNOUNCE_LENGTH, SENTENCES.length))
        .join(` `),
      category: [getRandomItemFrom(categories), getRandomItemFrom(categories)],
    };
  });
};

const createMocks = async (count) => {
  const offers = generateOffers(parseInt(count, 10), {
    titles: TITLES,
    categories: CATEGORIES,
    sentences: SENTENCES,
  });

  try {
    const content = JSON.stringify(offers);
    await fs.writeFile(FILE_NAME, content);

    console.log(chalk.green(`Success write ${count} mocks to ${FILE_NAME}`));
    process.exit(0);
  } catch (err) {
    console.error(chalk.red(err));
  }
};

module.exports = createMocks;
