const { Router } = require("express")

const MoviesNotesController = require("../controllers/MoviesNotesController")

const moviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController()

moviesNotesRoutes.get("/", moviesNotesController.index)
moviesNotesRoutes.get("/:id", moviesNotesController.show)
moviesNotesRoutes.post("/:user_id", moviesNotesController.create)
moviesNotesRoutes.delete("/:id", moviesNotesController.delete)

module.exports = moviesNotesRoutes;