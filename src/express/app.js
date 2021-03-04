"use strict";

const express = require(`express`);
const path = require(`path`);

const {rootController} = require(`./entities/root/root.controller`);
const {myController} = require(`./entities/my/my.controller`);
const {api} = require(`./providers/api.provider`);
const articlesRouter = require(`./routes/articles`);

const app = express();
app.use(express.static(path.resolve(__dirname, `./public`)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

const PORT = 3000;

app.use(`/`, rootController(api));
app.use(`/my`, myController(api));
app.use(`/articles`, articlesRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
