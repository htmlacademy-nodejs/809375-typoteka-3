"use strict";

const fs = require(`fs`).promises;

const {ProjectPath} = require(`../../constants`);

class MockDataService {
  constructor() {
    this._data = null;
  }

  async getData() {
    if (this._data !== null) {
      return this._data;
    }

    try {
      const fileContent = await fs.readFile(ProjectPath.MOCK_FILE_PATH);
      this._data = JSON.parse(fileContent);
    } catch (error) {
      console.error(error);
      return error;
    }

    return this._data;
  }
}

module.exports = {
  MockDataService,
};
