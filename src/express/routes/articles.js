"use strict";

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.send(`/offers/:id`));
articlesRouter.get(`/add`, (req, res) => res.send(`/offers/add`));
articlesRouter.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`));

module.exports = articlesRouter;
