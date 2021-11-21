"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {Router} = require(`express`);
const {validationResult} = require(`express-validator`);

const userValidator = require(`./users.validators`);
const {compare} = require(`../../lib/password`);

const userController = (userService) => {
  const route = new Router();

  route.get(`/`, async (req, res) => {
    const users = await userService.findAll();

    return res.status(StatusCodes.OK).json(users);
  });

  route.post(`/`,
      [
        userValidator.exist(userService),
        userValidator.create,
      ],
      async (req, res) => {
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

  route.post(`/auth`, async (req, res) => {
    const {email, password} = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json(`Email is incorrect`);
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (isPasswordCorrect) {
      // delete user.passwordHash;
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json(`Password is incorrect`);
    }
  });

  return route;
};

module.exports = {
  userController,
};
