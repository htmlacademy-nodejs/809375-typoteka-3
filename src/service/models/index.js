"use strict";

const defineUser = require(`./user`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineArticleCategory = require(`./article-category`);
const Alias = require(`./alias`);

const define = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Article.hasMany(Comment, {
    as: Alias.COMMENTS,
    foreignKey: `article_id`,
  });

  Article.belongsTo(User, {
    foreignKey: `user_id`,
  });

  Article.belongsToMany(Category, {
    through: ArticleCategory,
    foreignKey: `article_id`,
    as: Alias.CATEGORIES,
  });

  Category.belongsToMany(Article, {
    through: ArticleCategory,
    foreignKey: `category_id`,
    as: Alias.ARTICLES,
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

  return {Article, Category, Comment, User, ArticleCategory};
};

module.exports = define;
