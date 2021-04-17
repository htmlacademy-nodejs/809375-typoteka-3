"use strict";

const Sequelize = require(`sequelize`);

const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;

const somethingIsNotDefined = [DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT].some((it) => it === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: `postgres`,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10) || 5432, // default postgres port
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
});
