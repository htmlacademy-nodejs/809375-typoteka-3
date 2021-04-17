"use strict";

const {Model} = require(`sequelize`);

const define = (sequelize) => {
  class ArticleCategory extends Model {
  }

  ArticleCategory.init({}, {
    sequelize,
    modelName: `ArticleCategory`,
    tableName: `articles_categories`,
  });

  return ArticleCategory;
};

module.exports = define;


