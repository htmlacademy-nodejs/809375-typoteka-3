"use strict";

const {validationResult} = require(`express-validator`);
const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const articleValidator = require(`./articles.validators`);
const {commentValidators} = require(`./comment`);

const articlesController = (articlesService, commentService) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const {offset, limit, comments} = req.query;

    let result;

    if (limit || offset) {
      result = await articlesService.findPage({limit, offset});
    } else {
      result = await articlesService.findAll(comments);
    }
    return res.status(StatusCodes.OK).json(result);
  });

  route.post(`/`,
      [
        articleValidator.create,
      ],
      (async (req, res) => {
        const result = validationResult(req);
        const {errors} = result;

        if (errors.length === 0) {
          const article = await articlesService.create(req.body);

          return res.status(StatusCodes.OK).json(article);
        }

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
      }));

  route.put(`/:articleId`,
      [
        articleValidator.create,
        articleValidator.exist(articlesService),
      ],
      (async (req, res) => {
        const result = validationResult(req);
        const {errors} = result;

        const {articleId} = req.params;

        if (errors.length) {
          return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
        }

        const offer = await articlesService.update(articleId, req.body);
        return res.status(StatusCodes.OK).json(offer);
      }));

  route.delete(`/:articleId`,
      [
        articleValidator.exist(articlesService),
      ],
      (async (req, res) => {
        const {articleId} = req.params;

        const deletedArticle = await articlesService.delete(articleId);

        return res.status(StatusCodes.OK).json(deletedArticle);
      }));

  route.get(`/:articleId`, articleValidator.exist(articlesService), (async (req, res) => {
    const {articleId} = req.params;

    const article = await articlesService.findByID(articleId);
    const comments = await commentService.findAllByArticleId(articleId);
    return res.status(StatusCodes.OK).json({article, comments});
  }));

  route.get(`/:articleId/comments`,
      [
        articleValidator.exist(articlesService),
      ],
      (async (req, res) => {
        const {articleId} = req.params;

        const comments = await commentService.findAllByArticleId(articleId);
        return res.status(StatusCodes.OK).json(comments);
      }));

  route.delete(`/:articleId/comments/:commentId`,
      [
        articleValidator.exist(articlesService), commentValidators.exist(commentService, articlesService),
      ],
      async (req, res) => {
        const {commentId} = req.params;

        const deletedComment = await commentService.delete(commentId);

        return res.status(StatusCodes.OK).send(deletedComment);
      });

  route.post(`/:articleId/comments/`,
      [
        articleValidator.exist(articlesService), commentValidators.create,
      ],
      async (req, res) => {
        const result = validationResult(req);

        const {articleId} = req.params;
        const {errors} = result;

        if (errors.length) {
          return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: result.mapped()});
        }

        const comment = await commentService.create(articleId, req.body);

        return res.status(StatusCodes.OK).json(comment);
      });

  return route;
};

module.exports = {
  articlesController,
};
