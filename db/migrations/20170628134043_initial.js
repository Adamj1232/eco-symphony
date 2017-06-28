exports.up = function(knex, Promise) {
  return Promise.all([

    //create folders table
    knex.schema.createTable('folders', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.timestamps(true, true)
    }),

    //create links table
    knex.schema.createTable('links', (table) => {
      table.increments('id').primary()
      table.string('url')
      table.string('name')
      table.integer('clicks')
      table.integer('folder').unsigned()
      table.foreign('folder')
        .references('folders.id')

      table.timestamps(true, true)
    })

  ]) // end Promise.all
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('links'),
    knex.schema.dropTable('folders')
  ])
}
