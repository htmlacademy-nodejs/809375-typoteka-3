"use strict";

const {checkSchema} = require(`express-validator`);
const {StatusCodes, ReasonPhrases} = require(`http-status-codes`);

exports.exist = (commentService, articleService) => async (req, res, next) => {
  const {articleId, commentId} = req.params;

  const article = await articleService.findByID(articleId);

  if (!article) {
    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  }

  const comment = await commentService.findByID(commentId);

  if (comment) {
    res.locals.comment = comment;
    next();
  } else {
    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  }
};

exports.create = checkSchema({
  text: {
    notEmpty: {
      errorMessage: `Comment is required`,
    },
    isLength: {
      errorMessage: `Comment must be at least 20 characters`,
      options: {
        min: 20,
      },
    },
  },
});
