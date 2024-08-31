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

  async index(request,response){
    const { user_id } = request.params

    const moviesNotes = await knex("movies_notes")
      .select([
        "id",
        "title",
        "description",
        "rating"
      ])
      .where({ user_id })

    const userTags = await knex("movies_tags").where({ user_id })

    const moviesNotesWithTags = moviesNotes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id).map(tag => tag.name)

      return {
        ...note,
        tags: noteTags
      };
    })

    return response.json(moviesNotesWithTags)
  }

  async delete(request, response){
    const { id } = request.params

    await knex("movies_notes").where({ id }).delete()

    return response.json()
  }
}

module.exports = MoviesNotesController