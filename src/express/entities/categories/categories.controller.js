"use strict";

const {Router} = require(`express`);

const categoriesController = () => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const {user} = req.session;

    res.render(`root/all-categories`, {
      classNames: [`wrapper`, `wrapper--nobackground`],
      user,
    });
  });

  return route;
};

module.exports = {
  categoriesController,
};
