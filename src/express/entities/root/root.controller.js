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

  // TODO Refactor in next task?
  route.get(`/categories`, (req, res) => res.render(`root/all-categories`, {
    classNames: [`wrapper`, `wrapper--nobackground`],
  }));
  route.get(`/login`, (req, res) => res.render(`root/login`));
  route.get(`/register`, (req, res) => res.render(`root/sign-up`));

  route.get(`/search`, async (req, res) => {
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
  rootController,
};
