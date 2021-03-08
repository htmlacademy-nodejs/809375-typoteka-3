"use strict";

const {Router} = require(`express`);

const rootController = (api) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const articles = await api.getArticles();

    res.render(`root/main`, {
      articles,
    });
  });

  return route;
};

module.exports = {
  rootController,
};
