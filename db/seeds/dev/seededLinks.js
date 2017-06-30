const seedData = require('../seedData')

exports.seed = function(knex, Promise) {
  return knex('links').del()
    .then(function () {
      let seedLinks = []
      seedData.forEach(seed => {
        seedLinks.push(createLink(knex, seed))
      })
      return Promise.all(seedLinks)
    });
};

const createLink = (knex, link) => {
  return knex('links').insert({
    url: link.url,
    name: link.name,
    clicks: link.clicks,
    folder: link.folder,
    created_at: link.created_at,
    updated_at: link.updated_at
  }, 'id')
};
