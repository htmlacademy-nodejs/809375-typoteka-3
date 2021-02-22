"use strict";

const {validationResult} = require(`express-validator`);
const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const articleValidator = require(`./articles.validators`);
const {commentValidators} = require(`./comment`);

const articlesController = (articlesService, commentService) => {
  const route = new Router();

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
    const result = validationResult(req);
    const {errors} = result;

    const {articleId} = req.params;

    if (errors.length === 0) {
      const offer = articlesService.update(articleId, req.body);

      return res.status(StatusCodes.OK).json(offer);
    }

    return res.status(StatusCodes.BAD_REQUEST).json({errors: result.mapped()});
  }));

  route.delete(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const deletedArticle = articlesService.delete(articleId);

    return res.status(StatusCodes.OK).json(deletedArticle);
  }));

  route.get(`/:articleId`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;

    const article = articlesService.findByID(articleId);

    return res.status(StatusCodes.OK).json(article);
  }));

  route.get(`/:articleId/comments`, articleValidator.exist(articlesService), ((req, res) => {
    const {articleId} = req.params;
    const article = articlesService.findByID(articleId);

    const comments = commentService.findAll(article);

    return res.status(StatusCodes.OK).json(comments);
  }));

  route.delete(`/:articleId/comments/:commentId`, articleValidator.exist(articlesService), commentValidators.exist(commentService, articlesService), (req, res) => {
    const {articleId, commentId} = req.params;

    const article = articlesService.findByID(articleId);

    const deletedComment = commentService.delete(article, commentId);

    return res.status(StatusCodes.OK).send(deletedComment);
  });

  route.post(`/:articleId/comments/`, articleValidator.exist(articlesService), commentValidators.create, (req, res) => {
    const result = validationResult(req);

    const {articleId} = req.params;
    const {errors} = result;

    const article = articlesService.findByID(articleId);

    if (errors.length === 0) {
      const comment = commentService.create(article, req.body);

      return res.status(StatusCodes.OK).json(comment);
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
  });

  return route;
};

module.exports = {
  articlesController,
};
