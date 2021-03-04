"use strict";
const axios = require(`axios`);

class ApiProvider {
  constructor(client, baseURL) {
    this.client = client.create({
      baseURL,
    });
  }

  async getArticles() {
    const response = await this.client.get(`/articles`);
    console.log(response);

    return response.data;
  }

  async getArticle(id) {
    const response = await this.client.get(`/articles/${id}`);

    return response.data;
  }
}

module.exports = {
  api: new ApiProvider(axios, `http://localhost:3131/api`),
};
