"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

module.exports = (searchService) => {
  const route = new Router();

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(StatusCodes.BAD_REQUEST).json([]);
    }

    const searchResults = searchService.findAll(query);
    console.log(searchResults);
    return res.status(StatusCodes.OK).json(searchResults);
  });

  return route;
};
