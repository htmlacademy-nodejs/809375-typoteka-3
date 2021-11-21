"use strict";

const {Model, DataTypes} = require(`sequelize`);

const Alias = require(`./alias`);

const define = (sequelize) => {
  class Category extends Model {
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: `Category`,
    tableName: Alias.CATEGORIES,
  });

  return Category;
};

module.exports = define;
