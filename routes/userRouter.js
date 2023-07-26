const express = require("express");
const Router = express.Router();
const controller = require("../controllers/userController");

Router.get("/get/:id", controller.getUserById);

Router.post("/create", controller.createUser);
Router.post("/authenticate", controller.authenticateUser);
// Router.put("/update/displayname/:userToUpdate", controller.updateDisplayName)
// Router.put("/update/:emailToUpdate", controller.updateEmail)
// Router.delete("/delete/:userToDelete", controller.deleteUser)

module.exports = Router;
