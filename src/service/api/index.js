"use strict";

const {Router} = require(`express`);

const {SearchService, searchController} = require(`./search`);
const {CategoriesService, categoriesController} = require(`./categories`);
const {ArticlesService, articlesController} = require(`./articles`);
const {MockDataService} = require(`../lib/mock-data.service`);

module.exports = async () => {
  const apiRoute = new Router();
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  apiRoute.use(`/search`, searchController(new SearchService(mockData)));
  apiRoute.use(`/categories`, categoriesController(new CategoriesService(mockData)));
  apiRoute.use(`/articles`, articlesController(new ArticlesService(mockData)));

  return apiRoute;
};
