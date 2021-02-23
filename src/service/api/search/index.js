"use strict";

const searchController = require(`./search.controller`);
const {SearchService} = require(`./search.service`);

module.exports = {
  SearchService,
  searchController,
};
