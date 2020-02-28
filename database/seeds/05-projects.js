
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Ball out', dueDate: Date.now() + (86400000 * 1), notes: '', studentId: 1},
        {id: 2, name: 'Do Something', dueDate: Date.now() + (86400000 * 5), notes: '', studentId: 1},
        {id: 3, name: 'Create new technology', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 2},
        {id: 4, name: 'Learn Express', dueDate: Date.now() + (86400000 * 4), notes: '', studentId: 3},
        {id: 5, name: 'Why the world ended', dueDate: Date.now() + (86400000 * 1), notes: '', studentId: 4},
        {id: 6, name: 'Coffe Meeting', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 4},
        {id: 7, name: 'Javascript Presentation', dueDate: Date.now() + (86400000 * 3), notes: '', studentId: 5},
        {id: 8, name: 'New World Order', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 6},
        {id: 9, name: 'Kanye West: A Deep Dive', dueDate: Date.now() + (86400000 * 6), notes: '', studentId: 7},
        {id: 10, name: 'Is College worth the money', dueDate: Date.now() + (86400000 * 1), notes: '', studentId: 8},
        {id: 11, name: 'Presentation on Fish', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 8},
        {id: 12, name: 'Flat Earth: Why its true', dueDate: Date.now() + (86400000 * 3), notes: '', studentId: 9},
        {id: 13, name: 'Counting the stars', dueDate: Date.now() + (86400000 * 4), notes: '', studentId: 13},
        {id: 14, name: 'Karl Marx: Genius or Idiot', dueDate: Date.now() + (86400000 * 1), notes: '', studentId: 13},
        {id: 15, name: 'Mamba Mentality', dueDate: Date.now() + (86400000 * 2), notes: '', studentId:15},
        {id: 16, name: 'Lunch Meeting', dueDate: Date.now() + (86400000 * 3), notes: '', studentId: 15},
        {id: 17, name: 'Ghana: The Greatest World Power', dueDate: Date.now() + (86400000 * 5), notes: '', studentId: 16},
        {id: 18, name: 'Medical Scares', dueDate: Date.now() + (86400000 * 3), notes: '', studentId: 18},
        {id: 19, name: 'Find Your Happy', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 19},
        {id: 20, name: 'Dev Time', dueDate: Date.now() + (86400000 * 4), notes: '', studentId: 20},
        {id: 21, name: 'Mastermind Group', dueDate: Date.now() + (86400000 * 2), notes: '', studentId: 20},
      ]);
    });
};
