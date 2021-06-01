"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);
const userValidator = require(`./users.validators`);


const userController = (userService) => {
  const route = new Router();

  route.post(`/`, userValidator.exist(userService), userValidator.create, async (req, res) => {
    const result = validationResult(req);
    const {errors} = result;

    if (errors.length === 0) {
      try {
        const user = await userService.create(req.body);

        return res.status(StatusCodes.OK).json(user);
      } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({err});
      }
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors});
  });

  return route;
};

module.exports = {
  userController,
};
