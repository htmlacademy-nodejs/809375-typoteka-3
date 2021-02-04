"use strict";

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`, {
  classNames: [`wrapper`, `wrapper--nobackground`]
}));
myRouter.get(`/comments`, (req, res) => res.render(`my/comments`, {
  classNames: [`wrapper`, `wrapper--nobackground`]
}));
myRouter.get(`/categories`, (req, res) => res.render(`my/all-categories`));

module.exports = myRouter;
