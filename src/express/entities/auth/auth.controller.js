"use strict";

const {StatusCodes} = require(`http-status-codes`);
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
      repeatPassword: body[`password-repeat`],
      isAuthor: false,
    };

    try {
      await api.createUser(userData);
      res.redirect(`/login`);
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.EXPECTATION_FAILED).json(`ololo`);
    }
  });

  return route;
};

module.exports = {
  authController,
};
