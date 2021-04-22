"use strict";

class CategoriesService {
  constructor(db) {
    this._Category = db.models.Category;
  }

  async findAll() {
    return await this._Category.findAll({raw: true});
  }
}

module.exports = {
  CategoriesService,
};
