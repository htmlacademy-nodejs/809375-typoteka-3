"use strict";

const {shuffleArray, formatDate} = require(`./utils`);

describe(`utils.js`, () => {
  describe(`shuffleArray`, () => {
    test(`correct shuffle`, () => {
      const initial = [1, 2, 3, 4, 5, 6];

      expect(shuffleArray(initial)).not.toBe(initial);
    });
  });

  describe(`formatDate`, () => {
    test(`get correct formatted date`, () => {
      const date = new Date(`July 15, 1993`);
      const resultDate = `1993-07-14 21:00:00`;

      expect(formatDate(date)).toBe(resultDate);
    });
  });
});
