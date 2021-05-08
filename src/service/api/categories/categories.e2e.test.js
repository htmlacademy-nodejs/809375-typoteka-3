"use strict";

const request = require(`supertest`);
const express = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const Sequelize = require(`sequelize`);

const {getFixtureContent} = require(`../../../utils/utils`);
const {categoriesController} = require(`./categories.controller`);
const {CategoriesService} = require(`./categories.service`);
const initDB = require(`../../lib/init-db`);
const {generateUsers} = require(`../../../utils/utils`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

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

  app.use(`/api/categories`, categoriesController(new CategoriesService(mockDB)));
});

describe(`Categories api end-points`, () => {

  test(`should be status 200 on get all categories`, async () => {
    const response = await request(app).get(`/api/categories`);

    expect(response.status).toBe(StatusCodes.OK);
  });

  test(`should have correct response body`, async () => {
    const response = await request(app).get(`/api/categories`);

    const responseCategories = response.body.map((category) => category.label);

    expect(responseCategories).toStrictEqual(mockCategories);
  });
});
