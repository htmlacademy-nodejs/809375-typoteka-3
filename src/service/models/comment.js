'use strict';

const {DataTypes, Model} = require(`sequelize`);

const define = (sequelize) => {
  class Comment extends Model {
  }

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: `Comment`,
    tableName: `comments`,
  });

  return Comment;
};

module.exports = define;
