"use strict";

const {validationResult} = require(`express-validator`);
const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const articleValidator = require(`../articles/articles.validators`);

const route = new Router();

const articlesController = (articlesService) => {
  route.get(`/`, (req, res) => {
    const offers = articlesService.findAll();

    return res.status(StatusCodes.OK).json(offers);
  });

  route.post(`/`, articleValidator.create, ((req, res) => {
    const result = validationResult(req);
    const {errors} = result;

    if (errors.length === 0) {
      const article = articlesService.create(req.body);

      return res.status(StatusCodes.OK).json(article);
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
  }));

  route.put(`/:articleId`, articleValidator.create, articleValidator.exist(articlesService), ((req, res) => {
    const {errors} = validationResult(req);
    const {articleId} = req.params;

    if (errors.length === 0) {
      const offer = articlesService.update(articleId, req.body);

      return res.status(StatusCodes.OK).json(offer);
    }

    return res.status(StatusCodes.BAD_REQUEST).json(errors);
  }));

  route.delete(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const deletedArticle = articlesService.delete(articleId);

    res.status(StatusCodes.OK).json(deletedArticle);
  }));

  route.get(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const article = articlesService.findByID(articleId);

    res.status(StatusCodes.OK).json(article);
  }));

  return route;
};

module.exports = {
  articlesController,
};
