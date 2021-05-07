"use strict";

const {logger} = require(`../logger`);

const defineModels = require(`../models`);
const Alias = require(`../models/alias`);
const {getRandomItemFrom} = require(`../../utils/utils`);

module.exports = async (db, {articles, categories, users}) => {
  const {Article, User, Category} = defineModels(db);

  try {
    await db.sync({force: true});
  } catch (err) {
    logger.error(`DB init error: ${err}`);
    process.exit(1);
  }

  const categoriesTable = await Category.bulkCreate(
      categories.map((item) => ({label: item})),
  );

  const usersTable = await User.bulkCreate(users);

  const categoryIdByName = categoriesTable.reduce((acc, category) => ({
    [category.label]: category.id,
    ...acc,
  }), {});

  await Promise.all(articles.map(async (article) => {
    const createdArticle = await Article.create(article, {include: [Alias.COMMENTS]});
    await createdArticle.setUser(getRandomItemFrom(usersTable).id);
    await createdArticle.addCategories(article.categories.map((category) => categoryIdByName[category]));
  }));
};
