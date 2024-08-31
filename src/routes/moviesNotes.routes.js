const { Router } = require("express")

const MoviesNotesController = require("../controllers/MoviesNotesController")

const moviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController()

moviesNotesRoutes.post("/:user_id", moviesNotesController.create)
moviesNotesRoutes.delete("/:id", moviesNotesController.delete)

module.exports = moviesNotesRoutes;