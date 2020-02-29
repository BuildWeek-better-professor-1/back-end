
exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Ball out', notes: '', studentId: 1},
        {id: 2, name: 'Do Something', notes: '', studentId: 1},
        {id: 3, name: 'Create new technology', notes: '', studentId: 2},
        {id: 4, name: 'Learn Express', notes: '', studentId: 3},
        {id: 5, name: 'Why the world ended', notes: '', studentId: 4},
        {id: 6, name: 'Coffe Meeting', notes: '', studentId: 4},
        {id: 7, name: 'Javascript Presentation', notes: '', studentId: 5},
        {id: 8, name: 'New World Order', notes: '', studentId: 6},
        {id: 9, name: 'Kanye West: A Deep Dive', notes: '', studentId: 7},
        {id: 10, name: 'Is College worth the money', notes: '', studentId: 8},
        {id: 11, name: 'Presentation on Fish', notes: '', studentId: 8},
        {id: 12, name: 'Flat Earth: Why its true', notes: '', studentId: 9},
        {id: 13, name: 'Counting the stars', notes: '', studentId: 13},
        {id: 14, name: 'Karl Marx: Genius or Idiot', notes: '', studentId: 13},
        {id: 15, name: 'Mamba Mentality', notes: '', studentId:15},
        {id: 16, name: 'Lunch Meeting', notes: '', studentId: 15},
        {id: 17, name: 'Ghana: The Greatest World Power', notes: '', studentId: 16},
        {id: 18, name: 'Medical Scares', notes: '', studentId: 18},
        {id: 19, name: 'Find Your Happy', notes: '', studentId: 19},
        {id: 20, name: 'Dev Time', notes: '', studentId: 20},
        {id: 21, name: 'Mastermind Group', notes: '', studentId: 20},
      ]);
    });
};
