"use strict";

const {Router} = require(`express`);
const {checkUserAuthMiddleware, checkIsUserAuthor} = require(`../../middlewares/auth`);

const categoriesController = (api) => {
  const route = new Router();

  route.get(`/`,
      [
        checkUserAuthMiddleware,
        checkIsUserAuthor,
      ],
      async (req, res) => {
        const {user} = req.session;

        const categories = await api.getCategories();

        res.render(`root/all-categories`, {
          classNames: [`wrapper`, `wrapper--nobackground`],
          user,
          categories,
        });
      });

  return route;
};

module.exports = {
  categoriesController,
};
