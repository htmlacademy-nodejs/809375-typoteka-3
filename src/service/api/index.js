"use strict";

const {Router} = require(`express`);

const {ArticlesService, articlesController, CommentService} = require(`./articles`);
const {CategoriesService, categoriesController} = require(`./categories`);
const {MockDataService} = require(`../lib/mock-data.service`);
const {SearchService, searchController} = require(`./search`);

module.exports = async () => {
  const apiRoute = new Router();
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  apiRoute.use(`/search`, searchController(new SearchService(mockData)));
  apiRoute.use(`/categories`, categoriesController(new CategoriesService(mockData)));
  apiRoute.use(`/articles`, articlesController(new ArticlesService(mockData), new CommentService()));

  return apiRoute;
};
