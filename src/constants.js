"use strict";

const path = require(`path`);

const API_DEFAULT_PORT = process.env.API_PORT || 3001;
const EXPRESS_DEFAULT_PORT = process.env.EXPRESS_PORT || 3000;
const MAX_COMMENTS_AMOUNT = 5;
const MAX_ID_LENGTH = 4;
const ARTICLES_PER_PAGE = 8;

const ProjectPath = {
  ROOT_FOLDER: path.resolve(__dirname, `..`),
  DATA_FOLDER: path.resolve(__dirname, `../data`),
  MOCK_FILE_PATH: path.resolve(__dirname, `../mocks.json`),
  UPLOAD_DIR_PATH: path.resolve(__dirname, `../uploads`),
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
  TEST: `test`,
};

module.exports = {
  API_DEFAULT_PORT,
  ARTICLES_PER_PAGE,
  EXPRESS_DEFAULT_PORT,
  Env,
  MAX_COMMENTS_AMOUNT,
  MAX_ID_LENGTH,
  ProjectPath,
};
