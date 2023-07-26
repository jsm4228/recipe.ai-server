const mongoose = require("mongoose");
const { MONGO_PW } = require("../config");

let MONGODB_URI = `mongodb+srv://jsmathew41:${MONGO_PW}@cluster0.mbxc644.mongodb.net/`;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to remote MongoDB.");
  })
  .catch((e) => {
    console.log(`Connection Error: ${e.message}`);
  });

mongoose.set("debug", false);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB Connection Error:")
);

module.exports = mongoose.connection;
