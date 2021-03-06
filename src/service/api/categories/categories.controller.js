"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const categoriesController = (categoriesService) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const categories = categoriesService.findAll();

    return res.status(StatusCodes.OK).json(categories);
  });

  return route;
};

module.exports = {
  categoriesController,
};
