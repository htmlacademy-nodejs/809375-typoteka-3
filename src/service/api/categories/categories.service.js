"use strict";

class CategoriesService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }
}

module.exports = {
  CategoriesService,
};
