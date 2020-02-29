function createDate(){
  let randomDay = Math.floor(Math.random() * 8)
  const today = new Date
  return today.setDate(today.getDate() + randomDay)
}


exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: -1, dueDate: createDate(), name: 'Ball out', notes: '', studentId: -1},
        {id: -2, dueDate: createDate(), name: 'Do Something', notes: '', studentId: -1},
        {id: -3, dueDate: createDate(), name: 'Create new technology', notes: '', studentId: -2},
        {id: -4, dueDate: createDate(), name: 'Learn Express', notes: '', studentId: -3},
        {id: -5, dueDate: createDate(), name: 'Why the world ended', notes: '', studentId: -4},
        {id: -6, dueDate: createDate(), name: 'Coffe Meeting', notes: '', studentId: -4},
        {id: -7, dueDate: createDate(), name: 'Javascript Presentation', notes: '', studentId: -5},
        {id: -8, dueDate: createDate(), name: 'New World Order', notes: '', studentId: -6},
        {id: -9, dueDate: createDate(), name: 'Kanye West: A Deep Dive', notes: '', studentId: -7},
        {id: -10, dueDate: createDate(), name: 'Is College worth the money', notes: '', studentId: -8},
        {id: -11, dueDate: createDate(), name: 'Presentation on Fish', notes: '', studentId: -8},
        {id: -12, dueDate: createDate(), name: 'Flat Earth: Why its true', notes: '', studentId: -9},
        {id: -13, dueDate: createDate(), name: 'Counting the stars', notes: '', studentId: -13},
        {id: -14, dueDate: createDate(), name: 'Karl Marx: Genius or Idiot', notes: '', studentId: -13},
        {id: -15, dueDate: createDate(), name: 'Mamba Mentality', notes: '', studentId:1-5},
        {id: -16, dueDate: createDate(), name: 'Lunch Meeting', notes: '', studentId: -15},
        {id: -17, dueDate: createDate(), name: 'Ghana: The Greatest World Power', notes: '', studentId: -16},
        {id: -18, dueDate: createDate(), name: 'Medical Scares', notes: '', studentId: -18},
        {id: -19, dueDate: createDate(), name: 'Find Your Happy', notes: '', studentId: -19},
        {id: -20, dueDate: createDate(), name: 'Dev Time', notes: '', studentId: -20},
        {id: -21, dueDate: createDate(), name: 'Mastermind Group', notes: '', studentId: -20},
      ]);
    });
};
