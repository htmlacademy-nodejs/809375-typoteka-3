"use strict";

const {Router} = require(`express`);

const searchController = (api) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const {query} = req.query;
    const {user} = req.session;

    try {
      const articles = await api.search(query);

      res.render(`root/search`, {
        classNames: `wrapper-color`,
        articles,
        user,
      });
    } catch (err) {
      res.render(`root/search`, {
        classNames: `wrapper-color`,
        user,
      });
    }
  });

  return route;
};

module.exports = {
  searchController,
};
