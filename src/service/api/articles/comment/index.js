"use strict";

const {CommentService} = require(`./comment.service`);
const commentValidators = require(`./comment.validators`);

module.exports = {
  CommentService,
  commentValidators,
};
