"use strict";

const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);
const Sequelize = require(`sequelize`);

const {ArticlesService} = require(`./articles.service`);
const {CommentService} = require(`./comment/comment.service`);
const initDB = require(`../../lib/init-db`);
const {articlesController} = require(`./articles.controller`);
const {generateUsers} = require(`../../../utils/utils`);
const {getFixtureContent, createTestServer} = require(`../../../utils/utils`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

const mockCategories = [
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

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});

let app;

beforeEach(async () => {
  await initDB(mockDB, {
    articles: getMockData(),
    categories: mockCategories,
    users: generateUsers(5),
  });

  app = createTestServer(`/api/articles`, articlesController, mockDB, ArticlesService, CommentService);
});

describe(`Articles api end-points`, () => {
  const validPostBody = {
    "title": `Test post with more then 30 chars`,
    "createdDate": `1993/11/12`,
    "category": [`test`],
    "announce": `Test announce more then 30 chars`,
    "fullText": `Some very long description text`,
  };

  test(`should return all articles with 200 code`, async () => {
    const response = await request(app).get(`/api/articles`);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toBe(11);
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
    expect(response.body).toStrictEqual(responseWithErrors);
  });

  test(`should correct update post`, async () => {
    const response = await request(app).put(`/api/articles/1`).send(validPostBody);

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test(`should send 422 error on update post`, async () => {
    const response = await request(app).put(`/api/articles/1`).send({title: `to short title`});

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  test(`should delete exist article and response them`, async () => {
    const response = await request(app).delete(`/api/articles/1`);

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test(`should send 404 error on not exist article delete`, async () => {
    const response = await request(app).delete(`/api/articles/unExistID`);

    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
  });

  test(`should send exist article with 200 code`, async () => {
    const response = await request(app).get(`/api/articles/1`);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.title).toBe(`Ёлки. История деревьев в лесах Тайги`);
  });

  test(`should send 404 on not exist article`, async () => {
    const response = await request(app).get(`/api/articles/unExistID`);

    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
  });

  test(`should send comments and 200 status on exist article`, async () => {
    const response = await request(app).get(`/api/articles/1/comments`);
    const comments = [
      `Это где ж такие красоты?`,
      `Планируете записать видосик на эту тему?`,
      `Хочу такую же футболку :-)`,
    ];

    const expectedResponse = response.body.map((comment) => comment.text);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(expectedResponse).toEqual(comments);
  });

  test(`should delete exist comment from article with 200 code and return them`, async () => {
    const response = await request(app).delete(`/api/articles/1/comments/1`);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toBe(true);
  });

  test(`should send 404 error on try delete not exist comment`, async () => {
    const response = await request(app).delete(`/api/articles/1/comments/unExistID`);

    expect(response.status).toEqual(StatusCodes.NOT_FOUND);
  });

  test(`should create comment with 200 code`, async () => {
    const newComment = {
      text: `Some test long text with more then 20 chars`,
    };
    const response = await request(app).post(`/api/articles/1/comments`).send(newComment);

    expect(response.status).toEqual(StatusCodes.OK);
  });

  test(`should send 422 error on invalid comment create`, async () => {
    const newComment = {
      text: `To sort text`,
    };
    const errorText = {
      "errors": {
        "text": {
          "location": `body`,
          "msg": `Comment must be at least 20 characters`,
          "param": `text`,
          "value": `To sort text`,
        },
      },
    };

    const response = await request(app).post(`/api/articles/2/comments`).send(newComment);

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).toStrictEqual(errorText);
  });
});
