"use strict";

const defineUser = require(`./user`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const Alias = require(`./alias`);

const define = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, {
    as: Alias.COMMENTS,
    foreignKey: `article_id`,
  });

  Article.belongsToMany(Category, {
    through: `articles_categories`,
    as: Alias.CATEGORIES,
    foreignKey: `article_id`,
    timestamps: false,
    paranoid: false,
  });

  Category.belongsToMany(Article, {
    through: `articles_categories`,
    as: Alias.ARTICLES,
    foreignKey: `category_id`,
  });

  Comment.belongsTo(Article, {
    as: Alias.COMMENTS,
    foreignKey: `article_id`,
  });

  Comment.belongsTo(User, {
    as: Alias.USERS,
    foreignKey: `user_id`,
  });

  User.hasMany(Article, {
    as: Alias.ARTICLES,
    foreignKey: `user_id`,
  });


  return {Article, Category, Comment, User};
};

module.exports = define;
