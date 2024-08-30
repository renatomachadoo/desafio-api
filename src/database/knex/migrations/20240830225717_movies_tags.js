exports.up = knex => knex.schema.createTable("movies_tags", table => {
  table.increments("id")
  table.integer("note_id").references("id").inTable("movies_notes")
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.text("name")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("movies_tags")