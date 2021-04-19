"use strict";

const {Model, DataTypes} = require(`sequelize`);

const define = (sequelize) => {
  class ArticleCategory extends Model {
  }

  ArticleCategory.init({
    "article_id": {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    "category_id": {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `ArticleCategory`,
    tableName: `articles_categories`,
  });

  return ArticleCategory;
};

module.exports = define;


