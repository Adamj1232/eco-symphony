const seedData = require('../seedData')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('links').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

const createLink = (knex, link) => {
  return knex('links').insert({
    url: link.url,
    name: link.name,
    
  }, 'id')

    return Promise.all(footnotePromises);
  })
};
