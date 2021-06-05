"use strict";

const {ReasonPhrases} = require(`http-status-codes`);
const {Router} = require(`express`);

const authController = (api) => {
  const route = new Router();

  route.get(`/login`, (req, res) => res.render(`root/login`));
  route.get(`/register`, (req, res) => res.render(`root/sign-up`));
  route.post(`/register`, async (req, res) => {
    const {body} = req;

    const userData = {
      firstName: body.name,
      lastName: body.surname,
      email: body.email,
      password: body.password,
      repeatPassword: body[`repeat-password`],
      isAuthor: false,
    };

    try {
      await api.createUser(userData);
      res.redirect(`/login`);
    } catch (err) {
      const errors = err.response.data.errors ? err.response.data.errors.map((error) => error.msg) : ReasonPhrases.INTERNAL_SERVER_ERROR;

      res.render(`root/sign-up`, {errors});
    }
  });

  return route;
};

module.exports = {
  authController,
};
