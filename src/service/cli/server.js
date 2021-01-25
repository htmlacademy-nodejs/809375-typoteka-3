"use strict";

const chalk = require(`chalk`);
const http = require(`http`);
const path = require(`path`);
const fs = require(`fs`).promises;

const FILENAME = path.resolve(__dirname, `../../..`, `mocks.json`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, 200, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, 400, notFoundMessageText);
      }

      break;
    default:
      sendResponse(res, 400, notFoundMessageText);
      break;
  }
};


module.exports = (port = 3000) => {
  http.createServer(onClientConnect).listen(port).on(`listening`, (err) => {
    if (err) {
      return console.error(`Ошибка при создании сервера`, err);
    }

    return console.info(chalk.green(`Ожидаю соединений на ${port}`));
  });
};
