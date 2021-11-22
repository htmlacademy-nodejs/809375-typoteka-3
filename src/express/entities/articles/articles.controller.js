"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const csrf = require(`csurf`);

const {getImageMiddleware} = require(`../../lib/multer`);
const {checkUserAuthMiddleware, checkIsUserAuthor} = require(`../../middlewares/auth`);
const {UPLOADED_FILE_INPUT_NAME, ARTICLES_PER_PAGE} = require(`../../../constants`);

const articleController = (api) => {
  const route = new Router();
  const imageMiddleware = getImageMiddleware(UPLOADED_FILE_INPUT_NAME);
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

        try {
          await api.createArticle(newArticle);

          res.redirect(`/my`);
        } catch (error) {
          console.log(error);
          res.render(`errors/custom`, {errorMessage: error.message, user});
          res.status(StatusCodes.BAD_REQUEST).send(error.message);
        }
      });

  route.get(`/:id`, async (req, res) => {
    const {user} = req.session;
    const {id} = req.params;

    const article = await api.getArticle(id);

    res.render(`articles/post`, {
      user,
      article,
    });
  });

  route.get(`/category/:id`, async (req, res) => {
    const {user} = req.session;
    const {id} = req.params;
    let {page = 1} = req.query;

    const offset = (page - 1) * ARTICLES_PER_PAGE;

    const [categories, {category, count, articlesByCategory}] = await Promise.all([
      api.getCategories({needCount: true}),
      api.getCategory({limit: ARTICLES_PER_PAGE, categoryId: id, offset}),
    ]);

    const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

    const options = {
      user,
      count,
      page: +page,
      totalPages,
      categories,
      category,
      articles: articlesByCategory,
    };

    res.render(`articles/articles-by-category`, {...options});
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
