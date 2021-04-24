"use strict";

const {Router} = require(`express`);

const myController = (api) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const articles = await api.getArticles();

    res.render(`my`, {
      classNames: [`wrapper`, `wrapper--nobackground`],
      articles,
    });
  });

  route.get(`/comments`, async (req, res) => {
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
    });
  });

  route.get(`/categories`, (req, res) => res.render(`my/all-categories`));

  return route;
};

module.exports = {
  myController,
};
