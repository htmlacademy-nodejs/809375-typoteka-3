"use strict";

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../../../constants`);

// TODO think about bind all articles in initialization CommentService
class CommentService {
  _findIndexByID(article, commentId) {
    return article.comments.findIndex((comment) => comment.id === commentId);
  }

  create(article, comment) {
    const newComment = {...comment, id: nanoid(MAX_ID_LENGTH)};

    article.comments.push(newComment);

    return newComment;
  }

  delete(article, commentId) {
    return article.comments.splice(this._findIndexByID(article, commentId), 1);
  }

  findAll(article) {
    return article.comments;
  }

  findByID(article, commentId) {
    const index = this._findIndexByID(article, commentId);

    if (index === -1) {
      return null;
    }

    return article.comments[index];
  }
}

module.exports = {
  CommentService,
};
