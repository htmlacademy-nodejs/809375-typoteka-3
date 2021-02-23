"use strict";

const path = require(`path`);

const API_DEFAULT_PORT = 3001;
const FRONT_END_DEFAULT_PORT = 3000;
const MAX_COMMENTS_AMOUNT = 5;
const MAX_ID_LENGTH = 4;

const ProjectPath = {
  ROOT_FOLDER: path.resolve(__dirname, `..`),
  DATA_FOLDER: path.resolve(__dirname, `../data`),
  MOCK_FILE_PATH: path.resolve(__dirname, `../mocks.json`),
};

module.exports = {
  API_DEFAULT_PORT,
  FRONT_END_DEFAULT_PORT,
  MAX_COMMENTS_AMOUNT,
  MAX_ID_LENGTH,
  ProjectPath,
};
