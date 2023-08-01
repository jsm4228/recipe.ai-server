const { User } = require("../models/");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const initializePassport = require("../passport-config");

initializePassport(passport);

const authenticateUser = async (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Handle any errors
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      // Authentication failed, user not found or incorrect password
      return res.status(401).json({ message: info.message });
    }
    // Authentication successful, log in the user
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      const token = jwt.sign({ userId: user._id }, "your-secret-key", {
        expiresIn: "1h", // Token expiration time (adjust as needed)
      });
      // Send a success response with the info.message
      console.log("successfully logged in");
      return res.status(200).json({ message: info.message, user, token });
      //return res.status(200).json("Successfully logged in");
    });
  })(req, res);
};

// const authenticateUser = async (req, res) => {
//   console.log(req.body);
//   let response = initializePassport(
//     passport,
//     await User.findOne({ email: req.body.email })
//   );
//   console.log(response);
//   res.json(response);
// };

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
};

const getUserByEmail = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).populate({
      path: "incomingrequests outgoingrequests friends",
      // populate: { path: "outgoingrequests" },
    });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.send(newUser);
    console.log(newUser);
  } catch (error) {
    res.send(error);
  }
};

const updateDisplayName = async (req, res) => {
  try {
    const { userToUpdate } = req.params;
    const { newDisplayName } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userToUpdate },
      { displayname: newDisplayName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { emailToUpdate } = req.params;
    const { newEmail } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: emailToUpdate },
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userToDelete } = req.params;
    let userId = userToDelete;

    const usersToUpdate = await User.find({ friends: userId });

    const updatePromises = usersToUpdate.map((user) =>
      User.updateOne({ _id: user._id }, { $pull: { friends: userId } })
    );

    await Promise.all(updatePromises);

    const chatsToDelete = await Chat.deleteMany({ users: userId });

    const userData = await User.deleteOne({ _id: userId });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(`This account has been deleted!`);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateDisplayName,
  updateEmail,
  deleteUser,
  authenticateUser,
};
