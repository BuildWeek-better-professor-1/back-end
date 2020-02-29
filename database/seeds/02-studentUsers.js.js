
exports.seed = function(knex, Promise) {
  return knex('studentUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('studentUsers').insert([
        {id: 1, firstName: 'Kobe', email: 'kobe@lakers.com', username: 'kb24', password: 'mambamentality', lastName: 'Bryant', type: 'student', profId: 3},
        {id: 2, firstName: 'Lebron', email: 'lebron@lakers.com', username: 'kingjames', password: 'kingjames', lastName: 'James', type: 'student', profId: 2},
        {id: 3, firstName: 'Anthony', email: 'anthony@lakers.com', username: 'thebrow', password: 'thebrow', lastName: 'Davis', type: 'student', profId: 1},
      ]);
    });
};
