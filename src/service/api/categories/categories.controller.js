"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const categoriesController = (categoriesService) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const {needCount} = req.query;

    const categories = await categoriesService.findAll(needCount);

    return res.status(StatusCodes.OK).json(categories);
  });

  route.get(`/:categoryId`, async (req, res) => {
    const {categoryId} = req.params;
    const {limit, offset} = req.query;

    const [category, {count, articlesByCategory}] = await Promise.all([
      categoriesService.findOne(categoryId),
      categoriesService.findPage({categoryId, limit, offset}),
    ]);

    return res.status(StatusCodes.OK)
      .json({
        category,
        count,
        articlesByCategory,
      });
  });

  return route;
};

module.exports = {
  categoriesController,
};
