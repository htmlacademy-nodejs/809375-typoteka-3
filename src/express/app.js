"use strict";

const express = require(`express`);

const rootRouter = require(`./routes/root`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();

app.use(`/`, rootRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

module.exports = app;
