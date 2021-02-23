"use strict";

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../../constants`);

class ArticlesService {
  constructor(offers) {
    this._articles = offers;
  }

  _findIndexByID(id) {
    return this._articles.findIndex((offer) => offer.id === id);
  }

  create(offer) {
    const article = {
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
      ...offer,
    };

    this._articles.push(article);

    return article;
  }

  findByID(id) {
    const index = this._findIndexByID(id);

    if (index === -1) {
      return null;
    }

    return this._articles[index];
  }

  delete(id) {
    return this._articles.splice(this._findIndexByID(id), 1);
  }

  update(id, offer) {
    const index = this._findIndexByID(id);

    this._articles[index] = {...this._articles[index], ...offer};

    return this._articles[index];
  }

  findAll() {
    return this._articles || [];
  }
}

module.exports = {
  ArticlesService,
};
