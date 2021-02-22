"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const {getLogger} = require(`../../logger`);

const categoriesController = (categoriesService) => {
  const route = new Router();
  const logger = getLogger();

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
