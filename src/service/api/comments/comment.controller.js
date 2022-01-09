"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const commentController = (commentService) => {
  const route = new Router();


  route.get(`/`, async (req, res) => {
    const {limit = 32, offset = 0} = req.query;
    const comments = await commentService.findAll({
      limit,
      offset,
    });

    res.status(StatusCodes.OK).json(comments);
  });

  route.get(`/:commentId`, async (req, res) => {
    const comment = await commentService.findOne(req.params.commentId);

    res.status(StatusCodes.OK).json(comment);
  });

  route.delete(`/:commentId`, async (req, res) => {
    const {commentId} = req.params;

    const deletedComment = await commentService.delete(commentId);

    res.status(StatusCodes.OK).json(deletedComment);
  });

  return route;
};

module.exports = {
  commentController,
};
