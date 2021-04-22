"use strict";

class CommentService {
  constructor(db) {
    this._Comment = db.models.Comment;
  }

  create(articleId, comment) {
    return this._Comment.create({
      articleId,
      ...comment,
    });
  }

  async delete(commentId) {
    const deleted = await this._Comment.destroy({
      where: {id: commentId},
    });

    return !!deleted;
  }

  async findAll(articleId) {
    return await this._Comment.findAll({
      where: {
        'article_id': articleId,
      },
      raw: true,
    });
  }

  async findByID(commentId) {
    return await this._Comment.findByPk(commentId);
  }
}

module.exports = {
  CommentService,
};
