"use strict";

const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const {ProjectPath, MAX_ID_LENGTH} = require(`../../constants`);

const storage = multer.diskStorage({
  destination: ProjectPath.UPLOAD_DIR_PATH,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(MAX_ID_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const getImageMiddleware = (fileName) => multer({storage}).single(fileName);

module.exports = {
  storage,
  getImageMiddleware,
};
