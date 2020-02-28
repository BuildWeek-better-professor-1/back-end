
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Harry', email: 'harry@hogwarts.com', username: 'harry', password: 'harrypotter', lastName: 'Potter'},
        {id: 2, firstName: 'Severus', email: 'severus@hogwarts.com', username: 'severus', password: 'severus', lastName: 'Snape'},
        {id: 3, firstName: 'Albus', email: 'albus@hogwarts.com', username: 'albus', password: 'kingalbus', lastName: 'Dumbledore'},
      ]);
    });
};
