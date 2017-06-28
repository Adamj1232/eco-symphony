exports.up = function(knex, Promise) {
  return Promise.all([

    //create links table
    knex.schema.createTable('links', (table) => {
      table.increments('id').primary()
      table.string('url')
      table.string('name')
      table.integer('clicks')
      table.string('folder')
      table.timestamps(true, true)
    })
  ]) // end Promise.all
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('links'),
  ])
}
