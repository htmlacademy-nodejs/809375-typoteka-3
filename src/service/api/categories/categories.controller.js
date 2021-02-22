"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const {logger} = require(`../../logger`);

const categoriesController = (categoriesService) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const categories = categoriesService.findAll();

    res.status(StatusCodes.OK).json(categories);
    logger.info(`CATEGORIES: ${req.path} - end request with status code ${res.statusCode}`);
  });

  return route;
};

module.exports = {
  categoriesController,
};
