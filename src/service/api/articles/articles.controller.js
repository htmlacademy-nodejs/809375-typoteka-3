"use strict";

const {validationResult} = require(`express-validator`);
const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const articleValidator = require(`./articles.validators`);
const {commentValidators} = require(`./comment`);
const {getLogger} = require(`../../logger`);

const articlesController = (articlesService, commentService) => {
  const route = new Router();
  const logger = getLogger();


  route.get(`/`, (req, res) => {
    const offers = articlesService.findAll();

    res.status(StatusCodes.OK).json(offers);
    logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  });

  route.post(`/`, articleValidator.create, ((req, res) => {
    const result = validationResult(req);
    const {errors} = result;

    if (errors.length === 0) {
      const article = articlesService.create(req.body);

      res.status(StatusCodes.OK).json(article);
      logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
      return;
    }

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
    logger.error(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  }));

  route.put(`/:articleId`, articleValidator.create, articleValidator.exist(articlesService), ((req, res) => {
    const result = validationResult(req);
    const {errors} = result;

    const {articleId} = req.params;

    if (errors.length === 0) {
      const offer = articlesService.update(articleId, req.body);

      res.status(StatusCodes.OK).json(offer);
      logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
      return;
    }

    res.status(StatusCodes.BAD_REQUEST).json({errors: result.mapped()});
    logger.error(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  }));

  route.delete(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const deletedArticle = articlesService.delete(articleId);

    res.status(StatusCodes.OK).json(deletedArticle);
    logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  }));

  route.get(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const article = articlesService.findByID(articleId);

    res.status(StatusCodes.OK).json(article);
    logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  }));

  route.get(`/:articleId/comments`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;
    const article = articlesService.findByID(articleId);

    const comments = commentService.findAll(article);

    res.status(StatusCodes.OK).json(comments);
    logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  }));

  route.delete(`/:articleId/comments/:commentId`, articleValidator.exist(articlesService), commentValidators.exist(commentService, articlesService), (req, res) => {
    const {articleId, commentId} = req.params;

    const article = articlesService.findByID(articleId);

    const deletedComment = commentService.delete(article, commentId);

    res.status(StatusCodes.OK).send(deletedComment);
    logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  });

  route.post(`/:articleId/comments/`, articleValidator.exist(articlesService), commentValidators.create, (req, res) => {
    const result = validationResult(req);

    const {articleId} = req.params;
    const {errors} = result;

    const article = articlesService.findByID(articleId);

    if (errors.length === 0) {
      const comment = commentService.create(article, req.body);

      res.status(StatusCodes.OK).json(comment);
      logger.info(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
      return;
    }

    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
    logger.error(`ARTICLE: ${req.path} - end request with status code ${res.statusCode}`);
  });

  return route;
};

module.exports = {
  articlesController,
};
