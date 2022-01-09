"use strict";

const {Router} = require(`express`);

const {ArticlesService, articlesController} = require(`./articles`);
const {CategoriesService, categoriesController} = require(`./categories`);
const {SearchService, searchController} = require(`./search`);
const {UsersService, userController} = require(`./users`);
const {commentController, CommentService} = require(`./comments`);
const db = require(`../lib/db`);
const defineModels = require(`../models`);

module.exports = async () => {
  const apiRoute = new Router();
  defineModels(db);

  apiRoute.use(`/categories`, categoriesController(new CategoriesService(db)));
  apiRoute.use(`/search`, searchController(new SearchService(db)));
  apiRoute.use(`/articles`, articlesController(new ArticlesService(db), new CommentService(db)));
  apiRoute.use(`/users`, userController(new UsersService(db)));
  apiRoute.use(`/comments`, commentController(new CommentService(db)));
  return apiRoute;
};
