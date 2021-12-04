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

  async auth(email, password) {
    const response = await this.client.post(`users/auth`, {email, password});

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

  async getCategories({needCount} = {}) {
    const response = await this.client.get(`/categories`, {params: {needCount}});

    return response.data;
  }

  async getCategory({categoryId, limit, offset}) {
    const response = await this.client.get(`/categories/${categoryId}`, {params: {limit, offset}});

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

  async createComment(id, data) {
    const response = await this.client.post(`/articles/${id}/comments`, {...data});

    return response.data;
  }

  async getComments() {
    const response = await this.client.get(`/comments`);


    return response.data;
  }

  async deleteComment(commentId) {
    const response = await this.client.delete(`/comments/${commentId}`);

    return response.data;
  }
}

module.exports = {
  api: new ApiProvider(axios, backendURL),
};
