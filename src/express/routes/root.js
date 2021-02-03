"use strict";

const {Router} = require(`express`);

const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => res.render(`root/main`));
rootRouter.get(`/categories`, (req, res) => res.render(`root/all-categories`, {
  classNames: [`wrapper`, `wrapper--nobackground`]
}));
rootRouter.get(`/login`, (req, res) => res.render(`root/login`));
rootRouter.get(`/register`, (req, res) => res.render(`root/sign-up`));
rootRouter.get(`/search`, (req, res) => res.render(`root/search`,
    {classNames: `wrapper-color`}
));

module.exports = rootRouter;
