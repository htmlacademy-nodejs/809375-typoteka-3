"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const {getLogger} = require(`../../logger`);

module.exports = (searchService) => {
  const route = new Router();
  const logger = getLogger();

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      res.status(StatusCodes.BAD_REQUEST).json([]);
      logger.error(`SEARCH: ${req.path} - end request with status code ${res.statusCode}`);
      return;
    }

    const searchResults = searchService.findAll(query);

    res.status(StatusCodes.OK).json(searchResults);
    logger.info(`SEARCH: ${req.path} - end request with status code ${res.statusCode}`);
  });

  return route;
};
