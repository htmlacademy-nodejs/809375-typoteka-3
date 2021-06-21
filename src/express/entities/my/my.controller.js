"use strict";

const {Router} = require(`express`);

const {checkUserAuthMiddleware, checkIsUserAuthor} = require(`../../middlewares/auth`);

const myController = (api) => {
  const route = new Router();

  route.get(`/`, [
    checkUserAuthMiddleware,
    checkIsUserAuthor,
  ], async (req, res) => {
    const articles = await api.getArticles();
    const {user} = req.session;

    res.render(`my`, {
      classNames: [`wrapper`, `wrapper--nobackground`],
      articles,
      user,
    });
  });

  route.get(`/comments`,
      [
        checkUserAuthMiddleware,
        checkIsUserAuthor,
      ],
      async (req, res) => {
        const {user} = req.session;
        const articles = await api.getArticles({comments: true});
        const comments = articles.reduce((acc, article) => {
          const articleCommentsWithTitle = {
            title: article.title,
            comments: article.comments,
          };

          return [...acc, articleCommentsWithTitle];
        }, []);

        res.render(`my/comments`, {
          classNames: [`wrapper`, `wrapper--nobackground`],
          comments,
          user,
        });
      });

  route.get(`/categories`, [
    checkUserAuthMiddleware,
    checkIsUserAuthor,
  ],
  (req, res) => res.render(`my/all-categories`));

  return route;
};

module.exports = {
  myController,
};
