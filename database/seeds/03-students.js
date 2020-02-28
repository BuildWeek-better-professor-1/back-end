
exports.seed = function(knex, Promise) {
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, firstName: 'Kobe', lastName: 'Bryant'},
        {id: 2, firstName: 'Lebron', lastName: 'James'},
        {id: 3, firstName: 'Damian', lastName: 'Lilliard'},
        {id: 4, firstName: 'Anthony', lastName: 'Davis'},
        {id: 5, firstName: 'Michael', lastName: 'Jordan'},
        {id: 6, firstName: 'Magic', lastName: 'Johnson'},
        {id: 7, firstName: 'Quinn', lastName: 'Cook'},
        {id: 8, firstName: 'Shaq', lastName: 'Oneal'},
        {id: 9, firstName: 'Danny', lastName: 'Green'},
        {id: 10, firstName: 'Trae', lastName: 'Young'},
        {id: 11, firstName: 'Zion', lastName: 'Williamson'},
        {id: 12, firstName: 'Russell', lastName: 'Westbrook'},
        {id: 13, firstName: 'James', lastName: 'Harden'},
        {id: 14, firstName: 'Kawhi', lastName: 'Leonard'},
        {id: 15, firstName: 'Kyrie', lastName: 'Irving'},
        {id: 16, firstName: 'Kevin', lastName: 'Durant'},
        {id: 17, firstName: 'Steph', lastName: 'Curry'},
        {id: 18, firstName: 'Klay', lastName: 'Thompson'},
        {id: 19, firstName: 'Donovan', lastName: 'Mitchell'},
        {id: 20, firstName: 'Ja', lastName: 'Morant'}
      ]);
    });
};
