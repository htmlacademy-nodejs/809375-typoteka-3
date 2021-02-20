"use strict";

const {articlesController} = require(`./articles.controller`);
const {ArticlesService} = require(`./articles.service`);
const articleValidator = require(`./articles.validators`);

module.exports = {
  ArticlesService,
  articlesController,
  articleValidator,
};
