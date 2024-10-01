const { Router } = require("express")

const MoviesNotesController = require("../controllers/MoviesNotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesNotesRoutes = Router();
moviesNotesRoutes.use(ensureAuthenticated)

const moviesNotesController = new MoviesNotesController()

moviesNotesRoutes.get("/", moviesNotesController.index)
moviesNotesRoutes.get("/:id", moviesNotesController.show)
moviesNotesRoutes.post("/", moviesNotesController.create)
moviesNotesRoutes.delete("/:id", moviesNotesController.delete)

module.exports = moviesNotesRoutes;