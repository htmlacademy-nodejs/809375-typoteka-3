"use strict";

const {Router} = require(`express`);

const rootRouter = new Router();

rootRouter.get(`/`, (req, res) => res.render(`main`));
rootRouter.get(`/categories`, (req, res) => res.render(`all-categories`, {
  classNames: [`wrapper`, `wrapper--nobackground`]
}));
rootRouter.get(`/login`, (req, res) => res.render(`login`));
rootRouter.get(`/register`, (req, res) => res.render(`sign-up`));
rootRouter.get(`/search`, (req, res) => res.render(`search`,
    {classNames: `wrapper-color`}
));

module.exports = rootRouter;
