"use strict";

const {Router} = require(`express`);

const articleController = (api) => {
  const route = new Router();

  route.get(`/add`, (req, res) => res.render(`articles/new-post`));
  route.get(`/:id`, (req, res) => res.render(`articles/post`));
  route.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
  route.get(`/edit/:id`, async (req, res) => {
    const {id} = req.params;
    const article = await api.getArticle(id);

    res.render(`articles/edit-post`, {
      article,
    });
  });

  return route;
};

module.exports = {
  articleController,
};
