"use strict";

const {StatusCodes} = require(`http-status-codes`);
const {checkSchema} = require(`express-validator`);

exports.create = checkSchema({
  firstName: {
    notEmpty: {
      errorMessage: `Name is required`,
    },
    isString: {
      errorMessage: `Name must be a string`,
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: `Surname is required`,
    },
  },
  email: {
    notEmpty: {
      errorMessage: `category is required`,
    },
    isEmail: {
      errorMessage: `Email must be valid`,
    },
  },
  password: {
    notEmpty: {
      errorMessage: `Password is required`,
    },
    isLength: {
      errorMessage: `Password must be at least 6 characters but no longer than 250`,
      options: {
        min: 6,
        max: 250,
      },
    },
  },
  repeatPassword: {
    notEmpty: {
      errorMessage: `Confirm password is required`,
    },
    isLength: {
      errorMessage: `Confirm password  must be at least 6 characters but no longer than 250`,
      options: {
        min: 6,
        max: 250,
      },
    },
    custom: {
      options: (value, {req}) => {
        return value === req.body.password;
      },
      errorMessage: `Confirm password must be same as password`,
    },
  },
});

exports.exist = (userService) => async (req, res, next) => {
  const {email} = req.body;

  try {
    const isEmainExist = await userService.isEmailExist(email);
    if (isEmainExist) {
      res.status(StatusCodes.BAD_REQUEST).json({errors: [{msg: `User with such email exists.`}]});
    } else {
      next();
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};
