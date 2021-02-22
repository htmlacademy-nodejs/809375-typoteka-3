"use strict";

const {ReasonPhrases, StatusCodes} = require(`http-status-codes`);
const {checkSchema} = require(`express-validator`);

exports.create = checkSchema({
  title: {
    notEmpty: {
      errorMessage: `Title is required`,
    },
    isLength: {
      errorMessage: `Title must be at least 30 characters but no longer than 250`,
      options: {
        min: 30,
        max: 250,
      },
    },
  },
  createdDate: {
    notEmpty: {
      errorMessage: `Date is required`,
    },
    isDate: {
      errorMessage: `Date must be in format YYYY/MM/DD`,
    },
  },
  category: {
    notEmpty: {
      errorMessage: `category is required`,
    },
    isArray: {
      errorMessage: `category should be at least 1 word`,
      options: {min: 1},
    },
  },
  announce: {
    notEmpty: {
      errorMessage: `Announce is required`,
    },
    isLength: {
      errorMessage: `Announce must be at least 30 characters but no longer than 250`,
      options: {
        min: 30,
        max: 250,
      },
    },
  },
  fullText: {
    isLength: {
      errorMessage: `Full text must be no longer than 1000 chars`,
      options: {
        max: 1000,
      },
    },
    optional: {
      options: {
        nullable: true,
      },
    },
  },
});

exports.exist = (articlesService) => (req, res, next) => {
  const {articleId} = req.params;
  const article = articlesService.findByID(articleId);

  if (article) {
    next();
  } else {
    res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
  }
};
