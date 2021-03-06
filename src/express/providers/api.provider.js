"use strict";
const axios = require(`axios`);

const port = process.env.API_PORT || 3001;
const defaultUrl = `http://localhost:${port}/api/`;

class ApiProvider {
  constructor(client, baseURL) {
    this.client = client.create({
      baseURL,
    });
  }

  async getArticles() {
    const response = await this.client.get(`/articles`);

    return response.data;
  }

  async getArticle(id) {
    const response = await this.client.get(`/articles/${id}`);

    return response.data;
  }

  async search(query) {
    const response = await this.client.get(`/search`, {params: {query}});

    return response.data;
  }

  async getCategories() {
    const response = await this.client.get(`/categories`);

    return response.data;
  }

  async createOffer(data) {
    return await this.client.post(`/articles`, {
      method: `POST`,
      data,
    });
  }
}

module.exports = {
  api: new ApiProvider(axios, defaultUrl),
};
