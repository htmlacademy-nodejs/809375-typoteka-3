"use strict";

const {ReasonPhrases} = require(`http-status-codes`);
const {Router} = require(`express`);

const authController = (api) => {
  const route = new Router();

  route.get(`/login`, (req, res) => {
    const {user} = req.session;
    const {error} = req.query;

    res.render(`root/login`, {error, user});
  });
  route.post(`/login`, async (req, res) => {
    const {email, password} = req.body;

    try {
      req.session.user = await api.auth(email, password);
      res.redirect(`/`);
    } catch (err) {
      res.redirect(`/login?error=${encodeURIComponent(err.response.data)}`);
    }
  });
  route.get(`/logout`, (req, res) => {
    delete req.session.user;
    res.redirect(`/`);
  });
  route.get(`/register`, (req, res) => {
    const {user} = req.session;

    res.render(`root/sign-up`, {user});
  });
  route.post(`/register`, async (req, res) => {
    const {body} = req;
    const {user} = req.session;

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

      res.render(`root/sign-up`, {errors, user});
    }
  });

  return route;
};

module.exports = {
  authController,
};
