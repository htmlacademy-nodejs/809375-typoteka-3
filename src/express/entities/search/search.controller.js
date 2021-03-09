"use strict";

const {Router} = require(`express`);

const searchController = (api) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const {query} = req.query;

    try {
      const articles = await api.search(query);

      res.render(`root/search`, {
        classNames: `wrapper-color`,
        articles,
      });
    } catch (err) {
      res.render(`root/search`, {
        classNames: `wrapper-color`,
      });
    }
  });

  return route;
};

module.exports = {
  searchController,
};
