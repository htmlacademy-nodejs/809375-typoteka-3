"use strict";

const {Model, DataTypes} = require(`sequelize`);

const Alias = require(`./alias`);

const define = (sequelize) => {
  class Article extends Model {
  }

  Article.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [30, 250],
      },
    },
    announce: {
      type: DataTypes.STRING,
      validate: {
        len: [30, 250],
      },
      allowNull: false,
    },
    fullText: {
      type: DataTypes.STRING(1000),
      field: `full_text`,
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: `Article`,
    tableName: Alias.ARTICLES,
  });

  return Article;
};

module.exports = define;
