"use strict";

const {logger} = require(`../logger`);

const defineModels = require(`../models`);
const Alias = require(`../models/alias`);
const {getRandomItemFrom} = require(`../../utils/utils`);

module.exports = async (db, {articles, categories, users}) => {
  const {Article, User, Category} = defineModels(db);

  try {
    await db.sync({force: true});

    const categoriesTable = await Category.bulkCreate(
        categories.map((item) => ({label: item})),
    );

    const categoryIdByName = categoriesTable.reduce((acc, category) => ({
      [category.label]: category.id,
      ...acc,
    }), {});

    const usersTable = await User.bulkCreate(users);

    articles.forEach((article) => {
      article.comments.forEach((comment) => {
        comment[`user_id`] = getRandomItemFrom(usersTable).id;
      });
    });

    await Promise.all(articles.map(async (article) => {
      const createdArticle = await Article.create(article, {include: [Alias.COMMENTS]});
      await createdArticle.setUser(getRandomItemFrom(usersTable).id);
      await createdArticle.addCategories(article.categories.map((category) => categoryIdByName[category]));
    }));

  } catch (err) {
    logger.error(err);
  }
};
