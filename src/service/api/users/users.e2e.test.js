"use strict";

const request = require(`supertest`);
const express = require(`express`);
const {StatusCodes} = require(`http-status-codes`);
const Sequelize = require(`sequelize`);

const {getFixtureContent} = require(`../../../utils/utils`);
const {userController} = require(`./users.controller`);
const {UsersService} = require(`./users.service`);
const initDB = require(`../../lib/init-db`);
const {generateUsers} = require(`../../../utils/utils`);

const getMockData = () => JSON.parse(getFixtureContent(`mockArticles.json`));

const mockDB = new Sequelize(`sqlite::memory:`, {logging: false});
const app = express();
app.use(express.json());

const USERS_AMOUNT = 5;
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

const validUser = {
  firstName: `Serhii`,
  lastName: `Shramko`,
  email: `shramko.web@gmail.com`,
  password: `213123123`,
  repeatPassword: `213123123`,
  isAuthor: false,
};

beforeEach(async () => {
  await initDB(mockDB, {
    articles: getMockData(),
    categories: mockCategories,
    users: generateUsers(USERS_AMOUNT),
  });

  app.use(`/api/users`, userController(new UsersService(mockDB)));
});

describe(`Users api end-points`, () => {

  test(`should get all users with 200 code `, async () => {
    const searchEscapedURL = encodeURI(`/api/users`);
    const response = await request(app).get(searchEscapedURL);


    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toBe(USERS_AMOUNT);
  });

  test(`should create user with valid data`, async () => {
    const response = await request(app).post(`/api/users`).send(validUser);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty(`id`);
  });

  test(`should send 422 error on incorrect post data`, async () => {
    const incorrectUser = {
      firstName: `S`,
      lastName: `Shramko`,
      email: `Jonatan.Hilpaert@hotmail.com`,
      password: `21312`,
      repeatPassword: `213123123`,
      isAuthor: false,
    };

    const responseWithErrors = {
      "errors": [
        {
          "location": `body`,
          "msg": `Password must be at least 6 characters but no longer than 250`,
          "param": `password`,
          "value": `21312`,
        },
        {
          "location": `body`,
          "msg": `Confirm password must be same as password`,
          "param": `repeatPassword`,
          "value": `213123123`,
        },
      ],
    };

    const response = await request(app).post(`/api/users`).send(incorrectUser);

    expect(response.status).toEqual(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(response.body).toStrictEqual(responseWithErrors);
  });

  test(`should return user with 200 ok `, async () => {
    // Create user for test
    await request(app).post(`/api/users`).send(validUser);

    const response = await request(app).post(`/api/users/auth`).send({
      password: validUser.password,
      email: validUser.email,
    });

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty(`id`);
    expect(response.body).toStrictEqual(expect.objectContaining({
      email: validUser.email,
      firstName: validUser.firstName,
    }));
  });

  test(`should return error with 401 ok `, async () => {
    // Create user for test
    await request(app).post(`/api/users`).send(validUser);

    const response = await request(app).post(`/api/users/auth`).send({
      // some invalid password
      password: `1231231`,
      email: validUser.email,
    });

    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toStrictEqual(`Password is incorrect`);
  });
});
