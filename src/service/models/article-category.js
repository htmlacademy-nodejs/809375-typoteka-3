"use strict";

const {Model, DataTypes} = require(`sequelize`);

const define = (sequelize) => {
  class ArticleCategory extends Model {
  }

  ArticleCategory.init({
    articleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `article_id`,
    },
    categoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: `category_id`,
    },
  }, {
    sequelize,
    modelName: `ArticleCategory`,
    tableName: `articles_categories`,
  });

  return ArticleCategory;
};

module.exports = define;


