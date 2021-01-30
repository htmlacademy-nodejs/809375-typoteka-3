"use strict";

const express = require(`express`);
const path = require(`path`);

const rootRouter = require(`./routes/root`);
const myRouter = require(`./routes/my`);
const articlesRouter = require(`./routes/articles`);

const app = express();
app.use(express.static(path.resolve(__dirname, `./public`)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

const PORT = 3000;

app.use(`/`, rootRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
