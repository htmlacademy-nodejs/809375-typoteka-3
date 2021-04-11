"use strict";

const {Model, DataTypes} = require(`sequelize`);

const define = (sequelize) => {
  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAuthor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: `User`,
    tableName: `users`,
  });

  return User;
};


module.exports = define;
