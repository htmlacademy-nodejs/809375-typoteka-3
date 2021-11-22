"use strict";

const Alias = require(`../../models/alias`);

class ArticlesService {
  constructor(db) {
    this._Article = db.models.Article;
    this._User = db.models.User;
    this._Comment = db.models.Comment;
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
      include: [Alias.CATEGORIES, {
        model: this._Comment,
        as: Alias.COMMENTS,
        include: [
          {
            model: this._User,
            as: Alias.USERS,
            attributes: {
              exclude: [`passwordHash`]
            }
          }
        ]
      }],
    });
  }

  async findAll(needComments) {
    const include = [Alias.CATEGORIES];

    if (needComments) {
      include.push(Alias.COMMENTS);
    }

    const articles = await this._Article.findAll({include});
    return articles.map((article) => article.get());
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [Alias.CATEGORIES, Alias.COMMENTS],
      distinct: true,
    });

    return {count, articles: rows};
  }
}

module.exports = {
  ArticlesService,
};
