"use strict";

const {shuffleArray} = require(`./utils`);

describe(`utils.js`, () => {
  describe(`shuffleArray`, () => {
    test(`correct shuffle`, () => {
      const initial = [1, 2, 3, 4, 5, 6];

      expect(shuffleArray(initial)).not.toBe(initial);
    });
  });
});
