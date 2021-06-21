'use strict';

const checkUserAuthMiddleware = (req, res, next) => {
  const {user} = req.session;

  if (!user) {
    return res.redirect(`/login`);
  }
  return next();
};

const checkIsUserAuthor = (req, res, next) => {
  const {user} = req.session;

  if (!user || !user.isAuthor) {
    res.redirect(`/`);
    return;
  }

  next();
};

module.exports = {
  checkUserAuthMiddleware,
  checkIsUserAuthor,
};
