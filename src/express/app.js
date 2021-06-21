"use strict";

const express = require(`express`);
const path = require(`path`);
const helmet = require(`helmet`);
const {StatusCodes} = require(`http-status-codes`);
const session = require(`express-session`);

const {rootController} = require(`./entities/root/root.controller`);
const {myController} = require(`./entities/my/my.controller`);
const {articleController} = require(`./entities/articles/articles.controller`);
const {categoriesController} = require(`./entities/categories/categories.controller`);
const {searchController} = require(`./entities/search/search.controller`);
const {authController} = require(`./entities/auth/auth.controller`);
const {api} = require(`./providers/api.provider`);
const {EXPRESS_DEFAULT_PORT} = require(`../constants`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
const db = require(`../service/lib/db`);


const {SESSION_SECRET} = process.env;

if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}

const app = express();

const mySessionStore = new SequelizeStore({
  db,
  expiration: 180000,
  checkExpirationInterval: 60000
});

db.sync({force: false});

app.use(session({
  secret: SESSION_SECRET,
  store: mySessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
}));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, `./public`)));
app.use(express.static(path.resolve(__dirname, `./uploads`)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);
app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [`'self'`],
    scriptSrc: [`'self'`, `'unsafe-eval'`],
  },
}));

app.use(`/`, rootController(api));
app.use(`/`, authController(api));
app.use(`/my`, myController(api));
app.use(`/articles`, articleController(api));
app.use(`/search`, searchController(api));
app.use(`/categories`, categoriesController());

app.use((req, res) => res.status(StatusCodes.NOT_FOUND).render(`errors/404`));
app.use((err, _req, res, _next) => {
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .render(`errors/500`);
});

app.listen(EXPRESS_DEFAULT_PORT, () => {
  console.log(`Example app listening at http://localhost:${EXPRESS_DEFAULT_PORT}`);
});
