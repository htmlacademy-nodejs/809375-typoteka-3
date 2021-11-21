"use strict";

const Alias = require(`../../models/alias`);
const {hash} = require(`../../lib/password`);

class UsersService {
  constructor(db) {
    this._User = db.models.User;
    this._saltRounds = Number.parseInt(process.env.PASSWORD_SALT_ROUNDS, 10);
  }

  async create(userData) {
    userData.password = await hash(userData.password, this._saltRounds);

    if (userData.email === `s.shramko@gmail.com`) {
      userData.isAuthor = true;
    }

    const user = await this._User.create(userData);
    const rawUser = user.get();

    return {
      id: rawUser.id,
      firstName: rawUser.firstName,
      lastName: rawUser.lastName,
      avatar: rawUser.avatar,
    };
  }

  async findByEmail(email) {
    const user = await this._User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return user;
  }

  async findAll() {
    const include = [Alias.ARTICLES];

    return await this._User.findAll({include});
  }

  async findOne(id) {
    const user = await this._User.findByPk(id);

    return user.get();
  }

  async isEmailExist(email) {
    const user = await this._User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    return Boolean(user);
  }
}

module.exports = {
  UsersService,
};
