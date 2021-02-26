"use strict";

const request = require(`supertest`);
const express = require(`express`);
const {StatusCodes} = require(`http-status-codes`);

const {getFixtureContent} = require(`../../../utils/utils`);
const {searchController} = require(`./search.controller`);
const {SearchService} = require(`./search.service`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

// TODO move to create server ?
const app = express();
app.use(express.json());

describe(`Search api end-points`, () => {
  let mockData;

  beforeEach(() => {
    mockData = getMockData();
    app.use(`/api/search`, searchController(new SearchService(mockData)));
  });

  test(`should send correct status and body on right query`, async () => {
    const response = await request(app).get(`/api/search?query=How`);
    const result = [{
      "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
      "category": [`Без рамки`, `За жизнь`],
      "comments": [{
        "id": `BFtn`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      }, {"id": `2dXr`, "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`}],
      "createdDate": `2020-11-21 22:25:51`,
      "fullText": `Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов.`,
      "id": `4TzG`,
      "title": `How to start`,
    }];

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual(result);
  });

  test(`should send 400 error and empty array on incorrect query`, async () => {
    const response = await request(app).get(`/api/search?query=`);
    const result = [];

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual(result);
  });
});
