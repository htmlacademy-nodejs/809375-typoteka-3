"use strict";

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`articles/edit-post`));

module.exports = articlesRouter;
