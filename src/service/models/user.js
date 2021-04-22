"use strict";

const {Model, DataTypes} = require(`sequelize`);

const define = (sequelize) => {
  class User extends Model {
  }

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
      field: `password_hash`,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: `first_name`,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: `last_name`,

    },
    isAuthor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: `is_author`,
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
