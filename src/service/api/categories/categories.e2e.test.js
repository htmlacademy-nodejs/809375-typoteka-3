"use strict";

const request = require(`supertest`);
const express = require(`express`);
const {getFixtureContent} = require(`../../../utils/utils`);
const {categoriesController} = require(`./categories.controller`);
const {CategoriesService} = require(`./categories.service`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

const app = express();
app.use(express.json());

describe(`Categories api end-points`, () => {
  let mockData;

  beforeEach(() => {
    mockData = getMockData();
    app.use(`/api/categories`, categoriesController(new CategoriesService(mockData)));
  });

  test(`should be status 200 on get all categories`, async () => {
    const response = await request(app).get(`/api/categories`);

    expect(response.status).toBe(200);
  });

  test(`should have correct response body`, async () => {
    const response = await request(app).get(`/api/categories`);
    const categories = [`Разное`, `Музыка`, `Кино`, `Программирование`, `Железо`, `IT`, `Без рамки`];

    expect(response.body).toStrictEqual(categories);
  });
});
