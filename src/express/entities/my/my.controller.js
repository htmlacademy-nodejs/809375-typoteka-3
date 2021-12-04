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
        const response = await api.getComments();

        res.render(`my/comments`, {
          classNames: [`wrapper`, `wrapper--nobackground`],
          comments: response.comments,
          user,
        });
      });

  route.get(`/categories`, [
    checkUserAuthMiddleware,
    checkIsUserAuthor,
  ],
  (req, res) => res.render(`my/all-categories`));

  route.post(`/comments/:commentId`, async (req, res) => {
    const {commentId} = req.params;
    await api.deleteComment(commentId);

    res.redirect(`/my/comments`);
  });

  return route;
};

module.exports = {
  myController,
};
