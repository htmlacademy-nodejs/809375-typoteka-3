"use strict";

const {Router} = require(`express`);

const {ARTICLES_PER_PAGE} = require(`../../../constants`);

const rootController = (api) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const {user} = req.session;

    // get page number
    let {page = 1} = req.query;
    page = parseInt(page, 10);

    // the number of requested articles is equal to the number of articles per page
    const limit = ARTICLES_PER_PAGE;

    // the number of articles we need to skip is the number of articles on the previous pages
    const offset = (page - 1) * ARTICLES_PER_PAGE;

    const {count, articles} = await api.getArticles({comments: true, offset, limit});

    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    res.render(`root/main`, {
      articles,
      page,
      totalPages,
      user,
    });
  });

  return route;
};

module.exports = {
  rootController,
};
