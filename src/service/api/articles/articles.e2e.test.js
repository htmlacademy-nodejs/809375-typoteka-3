"use strict";

const request = require(`supertest`);
const {createTestServer} = require(`../../../utils/utils`);
const {StatusCodes} = require(`http-status-codes`);

const {getFixtureContent} = require(`../../../utils/utils`);
const {articlesController} = require(`./articles.controller`);
const {ArticlesService} = require(`./articles.service`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

// TODO move to create serve

describe(`Articles api end-points`, () => {
  let mockData;
  let app;
  const validPostBody = {
    "title": `Test post with more then 30 chars`,
    "createdDate": `1993/11/12`,
    "category": [`test`],
    "announce": `Test announce more then 30 chars`,
    "fullText": `Some very long description text`,
  };

  beforeEach(() => {
    mockData = getMockData();
    app = createTestServer(`/api/articles`, ArticlesService, articlesController, mockData);
  });

  test(`should return all articles with 200 code`, async () => {
    const response = await request(app).get(`/api/articles`);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toEqual(mockData);
  });

  test(`should create post with valid post`, async () => {
    const response = await request(app).post(`/api/articles`).send(validPostBody);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty(`id`);
  });

  test(`should send 422 error on incorrect post data`, async () => {
    const incorrectNewArticle = {
      "title": `To short title`,
      "createdDate": `1993/11/12`,
      "announce": `To short announce`,
    };
    const responseWithErrors = {
      "errors": {
        "announce": {
          "location": `body`,
          "msg": `Announce must be at least 30 characters but no longer than 250`,
          "param": `announce`,
          "value": `To short announce`,
        },
        "category": {"location": `body`, "msg": `category is required`, "param": `category`},
        "title": {
          "location": `body`,
          "msg": `Title must be at least 30 characters but no longer than 250`,
          "param": `title`,
          "value": `To short title`,
        },
      },
    };

    const response = await request(app).post(`/api/articles`).send(incorrectNewArticle);

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).toEqual(responseWithErrors);
  });

  test(`should correct update post`, async () => {
    const response = await request(app).put(`/api/articles/4TzG`).send(validPostBody);

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test(`should send 422 error on update post`, async () => {
    const response = await request(app).put(`/api/articles/4TzG`).send({title: `to short title`});

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  test(`should delete exist article and response them`, async () => {
    const response = await request(app).delete(`/api/articles/4TzG`);

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test(`should send 404 error on not exist article delete`, async () => {
    const response = await request(app).delete(`/api/articles/unExistID`);

    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
  });

  test(`should send exist article with 200 code`, async () => {
    const response = await request(app).get(`/api/articles/4TzG`);
    const article = {
      "announce": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
      "category": [
        `Без рамки`,
        `За жизнь`,
      ],
      "comments": [
        {
          "id": `BFtn`,
          "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
        },
        {
          "id": `2dXr`,
          "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
        },
      ],
      "createdDate": `2020-11-21 22:25:51`,
      "fullText": `Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Собрать камни бесконечности легко, если вы прирожденный герой. Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Из под его пера вышло 8 платиновых альбомов.`,
      "id": `4TzG`,
      "title": `How to start`,
    };

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(article);
  });

  test(`should send 404 on not exist article`, async () => {
    const response = await request(app).get(`/api/articles/unExistID`);

    expect(response.status).toEqual(404);
  });
});
