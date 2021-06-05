"use strict";
const axios = require(`axios`);

const backendURL = process.env.BACKEND_URL;

class ApiProvider {
  constructor(client, baseURL) {
    this.client = client.create({
      baseURL,
    });
  }

  async getArticles({comments, offset, limit} = {}) {

    const response = await this.client.get(`/articles`, {
      params: {
        comments,
        offset,
        limit,
      },
    });

    return response.data;
  }

  async createUser(user) {
    const response = await this.client.post(`/users`, user);

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
    try {
      const response = await this.client.post(`/articles`, {...data});

      return response.data;
    } catch (err) {
      throw new Error(JSON.stringify(err.response.data));
    }
  }
}

module.exports = {
  api: new ApiProvider(axios, backendURL),
};
