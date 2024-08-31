const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesNotesController{
  async create(request, response){
    const {title, description, rating, tags} = request.body
    const { user_id } = request.params

    const [note_id] = await knex("movies_notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const movieTags = tags.split(",").map(tag => tag.trim());
    
    const tagsInsert = movieTags.map(tag => {
      return {
          note_id,
          user_id,
          name: tag,
      }
    })

    await knex("movies_tags").insert(tagsInsert)
    
    return response.status(201).json()
  }
}

module.exports = MoviesNotesController