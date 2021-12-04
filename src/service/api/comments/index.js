"use strict";

const {CommentService} = require(`./comment.service`);
const commentValidators = require(`./comment.validators`);
const {commentController} = require(`./comment.controller`);

module.exports = {
  CommentService,
  commentValidators,
  commentController,
};
