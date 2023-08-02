const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  MONGO_PW: process.env.MONGO_PW,
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN,
  SECRET_SESSION: process.env.SECRET_SESSION,
  CLOUD_KEY: process.env.CLOUDKEY,
  CLOUD_SECRET: process.env.CLOUDKEY_SECRET,
};
