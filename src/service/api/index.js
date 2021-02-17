"use strict";

const {Router} = require(`express`);

const {SearchService, searchController} = require(`./search`);
const {MockDataService} = require(`../lib/mock-data.service`);

module.exports = async () => {
  const apiRoute = new Router();
  const dataService = new MockDataService();
  const mockData = await dataService.getData();

  apiRoute.use(`/search`, searchController(new SearchService(mockData)));


  return apiRoute;
};
