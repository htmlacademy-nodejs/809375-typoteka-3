"use strict";
const axios = require(`axios`);

const backendURL = process.env.BACKEND_URL;

class ApiProvider {
  constructor(client, baseURL) {
    this.client = client.create({
      baseURL,
    });
  }

  async getArticles({comments} = {}) {

    const response = await this.client.get(`/articles`, {
      params: {comments},
    });

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

  async createArticle(data) {
    const response = await this.client.post(`/articles`, {...data});

    return response.data;
  }
}

module.exports = {
  api: new ApiProvider(axios, backendURL),
};
