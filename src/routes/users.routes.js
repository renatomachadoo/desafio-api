const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const userRoutes = Router();

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)
userRoutes.patch("/avatar", ensureAuthenticated, userAvatarController.update)

module.exports = userRoutes;