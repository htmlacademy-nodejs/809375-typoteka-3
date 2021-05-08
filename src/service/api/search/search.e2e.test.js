"use strict";

const request = require(`supertest`);
const express = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const Sequelize = require(`sequelize`);

const {getFixtureContent} = require(`../../../utils/utils`);
const {searchController} = require(`./search.controller`);
const {SearchService} = require(`./search.service`);
const initDB = require(`../../lib/init-db`);
// TODO move mock db to fixtures
const {generateUsers} = require(`../../../utils/utils`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

// TODO move to fixtures
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

beforeAll(async () => {
  await initDB(mockDB, {
    articles: getMockData(),
    categories: mockCategories,
    users: generateUsers(5),
  });

  app.use(`/api/search`, searchController(new SearchService(mockDB)));
});

describe(`Search api end-points`, () => {

  test(`should send correct status and body on right query`, async () => {
    const searchEscapedURL = encodeURI(`/api/search?query=Ёлки`);
    const response = await request(app).get(searchEscapedURL);

    const responseArticles = response.body.map((article) => article.title);

    expect(responseArticles).toContain(`Ёлки. История деревьев в лесах Тайги`);
  });

  test(`should send 400 error and empty array on incorrect query`, async () => {
    const response = await request(app).get(`/api/search?query=`);
    const result = [];

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toEqual(result);
  });
});
