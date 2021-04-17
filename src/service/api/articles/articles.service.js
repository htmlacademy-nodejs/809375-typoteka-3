"use strict";

const {nanoid} = require(`nanoid`);

const Alias = require(`../../models/alias`);

class ArticlesService {
  constructor(db) {
    this._Article = db.models.Article;
  }

  async create(article) {
    const newArticle = await this._Article.create(article);
    await newArticle.addCategories(article.categories);

    return newArticle.get();
  }

  async delete(id) {
    return await this._Article.destroy({
      where: {id},
    });
  }

  async update(id, newArticle) {
    return await this._Article.update(newArticle, {
      where: {id},
    });
  }

  async findByID(id) {
    return this._Article.findByPk(id, {
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
  }

  async findAll() {
    return await this._Article.findAll({
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
  }
}

module.exports = {
  ArticlesService,
};
