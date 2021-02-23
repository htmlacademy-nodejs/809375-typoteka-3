"use strict";

const articleValidator = require(`./articles.validators`);
const {ArticlesService} = require(`./articles.service`);
const {CommentService} = require(`./comment/index`);
const {articlesController} = require(`./articles.controller`);

module.exports = {
  ArticlesService,
  CommentService,
  articleValidator,
  articlesController,
};
