"use strict";

const {Router} = require(`express`);

const categoriesController = () => {
  const route = new Router();

  route.get(`/`, (req, res) => res.render(`root/all-categories`, {
    classNames: [`wrapper`, `wrapper--nobackground`],
  }));

  return route;
};

module.exports = {
  categoriesController,
};
