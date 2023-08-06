const express = require("express");
const Router = require("./routes/AppRouter");
const cors = require("cors");
const db = require("./db");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();

const { SECRET_SESSION } = require("./config");

const { PORT, ORIGIN } = require("./config");
const app = express();

app.use(express.json());
app.use(cors());
app.use(flash());
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); // Uncomment this line to initialize Passport.js
app.use(passport.session()); // Uncomment this line to use Passport.js session

app.use("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/api", Router);

const server = app.listen(PORT, () =>
  console.log(`Application is listening on port ${PORT}.`)
);
