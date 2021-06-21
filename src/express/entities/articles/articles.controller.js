"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const csrf = require(`csurf`);

const {getImageMiddleware} = require(`../../lib/multer`);
const {checkUserAuthMiddleware, checkIsUserAuthor} = require(`../../middlewares/auth`);

const articleController = (api) => {
  const route = new Router();
  const imageMiddleware = getImageMiddleware(`upload`);
  const csrfProtection = csrf({cookie: false});

  route.get(`/add`,
      [
        checkUserAuthMiddleware,
        checkIsUserAuthor,
        csrfProtection,
      ], (req, res) => {

        res.render(`articles/new-post`, {
          csrfToken: req.csrfToken(),
        });
      });

  route.post(`/add`,
      [
        checkUserAuthMiddleware,
        checkIsUserAuthor,
        imageMiddleware,
      ], async (req, res) => {
        const {body} = req;
        const {user} = req.session;

        // TODO Remove after DB & schema
        const newArticle = {
          title: body.title,
          createdDate: `1993/11/12`, // TODO remove
          category: [`test`], // TODO remove
          announce: body.announcement,
          fullText: body[`full-text`],
        };

        console.log(`123123`);

        try {
          await api.createArticle(newArticle);

          res.redirect(`/my`);
        } catch (error) {
          console.log(error);
          res.render(`errors/custom`, {errorMessage: error.message, user});
          res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
      });
  route.get(`/:id`, (req, res) => {
    const {user} = req.session;

    res.render(`articles/post`, {user});
  });
  route.get(`/category/:id`, (req, res) => {
    const {user} = req.session;

    res.render(`articles/articles-by-category`, {user});
  });
  route.get(`/edit/:id`, async (req, res) => {
    const {id} = req.params;
    const {user} = req.session;
    const article = await api.getArticle(id);

    res.render(`articles/edit-post`, {
      article,
      user,
    });
  });

  return route;
};

module.exports = {
  articleController,
};
