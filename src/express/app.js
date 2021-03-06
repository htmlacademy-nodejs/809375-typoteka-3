"use strict";

const express = require(`express`);
const path = require(`path`);

const {rootController} = require(`./entities/root/root.controller`);
const {myController} = require(`./entities/my/my.controller`);
const {articleController} = require(`./entities/articles/articles.controller`);
const {api} = require(`./providers/api.provider`);
const {EXPRESS_DEFAULT_PORT} = require(`../constants`);

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, `./public`)));
app.use(express.static(path.resolve(__dirname, `./uploads`)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/`, rootController(api));
app.use(`/my`, myController(api));
app.use(`/articles`, articleController(api));

app.listen(EXPRESS_DEFAULT_PORT, () => {
  console.log(`Example app listening at http://localhost:${EXPRESS_DEFAULT_PORT}`);
});
