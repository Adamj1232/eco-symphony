const seedData = require('../seedData')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links').del()
    .then(function () {
      // Inserts seed entries
      return knex('links').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

const createLink = (knex, link) => {
  return knex('links').insert({
    id: link.id,
    url: link.url,
    name: link.name,
    clicks: link.clicks,
    folder: link.folder,
    created_at: link.created_at,
    updated_at: link.updated_at
  }, 'id')

    return Promise.all(footnotePromises);
  })
};
