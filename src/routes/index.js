const { Router } = require("express")

const usersRouter = require("./users.routes")
const moviesNotesRouter = require("./moviesNotes.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/movies_notes", moviesNotesRouter)

module.exports = routes