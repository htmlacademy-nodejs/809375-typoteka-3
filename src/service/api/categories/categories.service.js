"use strict";
const Sequelize = require(`sequelize`);
const Alias = require(`../../models/alias`);

class CategoriesService {
  constructor(db) {
    this._Category = db.models.Category;
    this._Article = db.models.Article;
    this._Comment = db.models.Comment;
    this._ArticleCategory = db.models.ArticleCategory;
  }

  async findOne(id) {
    return this._Category.findByPk(id);
  }

  async findPage({categoryId, limit, offset}) {
    const articlesIdByCategory = await this._ArticleCategory.findAll({
      attributes: [`article_id`],
      where: {
        "category_id": categoryId,
      },
      raw: true,
    });

    const articlesId = articlesIdByCategory.map((item) => item.article_id);

    const {count, rows} = await this._Article.findAndCountAll({
      limit,
      offset,
      include: [
        Alias.CATEGORIES,
        {
          model: this._Comment,
          as: Alias.COMMENTS,
          attributes: [`id`],
        },
      ],
      where: {
        id: articlesId,
      },
    });

    return {count, articlesByCategory: rows};
  }

  async findAll(withCount = false) {
    if (withCount) {
      const categories = await this._Category.findAll({
        attributes: [
          `id`,
          `label`,
          [Sequelize.fn(`COUNT`, `*`), `count`],
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [{
          attributes: [],
          model: this._Article,
          as: Alias.ARTICLES,
          through: {
            attributes: [],
          },
        }]
      });

      return categories.map((it) => it.get());
    } else {
      return await this._Category.findAll({raw: true});
    }
  }
}

module.exports = {
  CategoriesService,
};
