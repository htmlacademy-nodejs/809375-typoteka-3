"use strict";

const {Router} = require(`express`);

const authController = () => {
  const route = new Router();

  route.get(`/login`, (req, res) => res.render(`root/login`));
  route.get(`/register`, (req, res) => res.render(`root/sign-up`));

  return route;
};

module.exports = {
  authController,
};
