"use strict";

const {Model, DataTypes} = require(`sequelize`);

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
      unique: true,
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
    },
    photo: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: `Article`,
    tableName: `articles`,
  });

  return Article;
};

module.exports = define;
