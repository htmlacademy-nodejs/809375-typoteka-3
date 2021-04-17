"use strict";

const {Router} = require(`express`);

const {ArticlesService, articlesController, CommentService} = require(`./articles`);
const {CategoriesService, categoriesController} = require(`./categories`);
const {SearchService, searchController} = require(`./search`);
const db = require(`../lib/db`);
const defineModels = require(`../models`);

module.exports = async () => {
  const apiRoute = new Router();
  defineModels(db);

  apiRoute.use(`/categories`, categoriesController(new CategoriesService(db)));
  apiRoute.use(`/search`, searchController(new SearchService(db)));
  apiRoute.use(`/articles`, articlesController(new ArticlesService(db), new CommentService(db)));
  return apiRoute;
};
