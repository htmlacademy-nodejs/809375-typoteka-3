"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const {getImageMiddleware} = require(`../../lib/multer`);

const articleController = (api) => {
  const route = new Router();
  const imageMiddleware = getImageMiddleware(`upload`);

  route.get(`/add`, (req, res) => res.render(`articles/new-post`));
  route.post(`/add`,
      [
        imageMiddleware
      ], async (req, res) => {
        const {body} = req;

        // TODO Remove after DB & schema
        const newArticle = {
          title: body.title,
          createdDate: `1993/11/12`, // TODO remove
          category: [`test`], // TODO remove
          announce: body.announcement,
          fullText: body[`full-text`],
        };

        try {
          await api.createArticle(newArticle);

          res.redirect(`/my`);
        } catch (error) {
          res.render(`errors/custom`, {errorMessage: error.message});
          res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
      });
  route.get(`/:id`, (req, res) => res.render(`articles/post`));
  route.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
  route.get(`/edit/:id`, async (req, res) => {
    const {id} = req.params;
    const article = await api.getArticle(id);

    res.render(`articles/edit-post`, {
      article,
    });
  });

  return route;
};

module.exports = {
  articleController,
};
