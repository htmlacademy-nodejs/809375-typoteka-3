"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);

const userController = (userService) => {
  const route = new Router();

  route.post(`/`, async (req, res, next) => {
    try {
      const userData = req.body;

      const newUser = await userService.create(userData);

      res.status(StatusCodes.CREATED).json(newUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  return route;
};

module.exports = {
  userController,
};
