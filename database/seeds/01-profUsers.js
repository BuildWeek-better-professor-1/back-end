
exports.seed = function(knex, Promise) {
  return knex('professorUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('professorUsers').insert([
        {id: -1, firstName: 'Harry', email: 'harry@hogwarts.com', username: 'harry', password: 'harrypotter', lastName: 'Potter', type: 'professor'},
        {id: -2, firstName: 'Severus', email: 'severus@hogwarts.com', username: 'severus', password: 'severus', lastName: 'Snape', type: 'professor'},
        {id: -3, firstName: 'Albus', email: 'albus@hogwarts.com', username: 'albus', password: 'kingalbus', lastName: 'Dumbledore', type: 'professor'},
      ]);
    });
};
