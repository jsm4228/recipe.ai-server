// passport-config.js
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("./models/");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return done(null, false, { message: "No user with that email" });
      }
      try {
        if (await bcrypt.compare(password, user.password)) {
          console.log("success");
          return done(null, user, { message: "Logged in successfully" });
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  return passport; // Return the configured passport object
};

module.exports = initialize;

// const LocalStrategy = require("passport-local").Strategy;
// const passport = require("passport");
// const bcrypt = require("bcrypt");

// const initialize = async (passport, user) => {
//   const authenticateUser = async (email, password, done) => {
//     try {
//       if (!user) {
//         return done(null, false, { message: "No user with that username" });
//       }
//       try {
//         if (await bcrypt.compare(password, user.password)) {
//           return done(null, user);
//         } else {
//           return done(null, false, { message: "Incorrect password" });
//         }
//       } catch (error) {
//         return done(error);
//       }
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   };
//   passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
//   passport.deserializeUser(async (user, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user); // Retrieve the user's information based on the stored ID
//     } catch (error) {
//       done(error);
//     }
//   });
// };

// module.exports = initialize;
