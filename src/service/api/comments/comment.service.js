"use strict";

const Alias = require(`../../models/alias`);

class CommentService {
  constructor(db) {
    this._Comment = db.models.Comment;
    this._Article = db.models.Article;
    this._User = db.models.User;
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

  findOne(commentId) {
    return this._Comment.findAll({
      where: {
        "id": commentId,
      },
      include: [
        {
          model: this._User,
          as: Alias.USERS,
          attributes: {
            include: [
              `firstName`,
              `lastName`,
              `avatar`,
            ],
            exclude: [
              `password`,
            ],
          },
        },
      ],
    });
  }

  async findAll() {
    const {count, rows: comments} = await this._Comment.findAndCountAll({
      include: [
        {
          model: this._Article,
          as: Alias.ARTICLES,
          attributes: [
            `id`,
            `title`,
          ],
        },
        {
          model: this._User,
          as: Alias.USERS,
          attributes: {
            include: [
              `firstName`,
              `lastName`,
              `avatar`,
            ],
            exclude: [
              `password`,
            ],
          },
        },
      ],
    });

    return {count, comments};
  }


  async findAllByArticleId(articleId) {
    return await this._Comment.findAll({
      where: {
        "article_id": articleId,
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
