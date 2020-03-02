
exports.seed = function(knex, Promise) {
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: -1, firstName: 'Kobe', lastName: 'Bryant', username: 'blackmamba', email: 'kobe@lakers.com', password: 'lakers123', registered: true},
        {id: -2, firstName: 'Lebron', lastName: 'James', registered: false},
        {id: -3, firstName: 'Damian', lastName: 'Lilliard', username: 'damedolla', email: 'dame@blazers.com', password: 'dame', registered: true},
        {id: -4, firstName: 'Anthony', lastName: 'Davis', registered: false},
        {id: -5, firstName: 'Michael', lastName: 'Jordan', username: 'thegoat', email: 'jordan@nike.com', password: 'jumpman', registered: true},
        {id: -6, firstName: 'Magic', lastName: 'Johnson', registered: false},
        {id: -7, firstName: 'Quinn', lastName: 'Cook', username: 'cookquinn', email: 'quinn@lakers.com', password: 'cookquinn', registered: true},
        {id: -8, firstName: 'Shaq', lastName: 'Oneal', registered: false},
        {id: -9, firstName: 'Danny', lastName: 'Green', username: 'sniperdanny', email: 'danny@lakers.com', password: 'sniperdanny', registered: true},
        {id: -10, firstName: 'Trae', lastName: 'Young', registered: false},
        {id: -11, firstName: 'Zion', lastName: 'Williamson', username: 'beastZ', email: 'zion@pelicans.com', password: 'beastZ', registered: true},
        {id: -12, firstName: 'Russell', lastName: 'Westbrook', registered: false},
        {id: -13, firstName: 'James', lastName: 'Harden', username: 'mrrocket', email: 'james@rockets.com', password: 'mrrocket', registered: true},
        {id: -14, firstName: 'Kawhi', lastName: 'Leonard', registered: false},
        {id: -15, firstName: 'Kyrie', lastName: 'Irving', username: 'uncledrew', email: 'kyrie@nets.com', password: 'flatearth', registered: true},
        {id: -16, firstName: 'Kevin', lastName: 'Durant', registered: false},
        {id: -17, firstName: 'Steph', lastName: 'Curry', username: 'chefcurry', email: 'curry@warrios.com', password: 'chefcurry', registered: true},
        {id: -18, firstName: 'Klay', lastName: 'Thompson', registered: false},
        {id: -19, firstName: 'Donovan', lastName: 'Mitchell', username: 'spidaman', email: 'dono@jazz.com', password: 'spidaman', registered: true},
        {id: -20, firstName: 'Ja', lastName: 'Morant', registered: false}
      ]);
  });
};
