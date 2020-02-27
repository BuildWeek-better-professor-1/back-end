
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('student list').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('student list').insert([
        {profId: 1, studentId: 1},
        {profId: 1, studentId: 2},
        {profId: 1, studentId: 3},
        {profId: 1, studentId: 4},
        {profId: 1, studentId: 5},
        {profId: 1, studentId: 6},
        {profId: 2, studentId: 7},
        {profId: 2, studentId: 8},
        {profId: 2, studentId: 9},
        {profId: 2, studentId: 10},
        {profId: 2, studentId: 11},
        {profId: 2, studentId: 12},
        {profId: 2, studentId: 13},
        {profId: 3, studentId: 14},
        {profId: 3, studentId: 15},
        {profId: 3, studentId: 16},
        {profId: 3, studentId: 17},
        {profId: 3, studentId: 18},
        {profId: 3, studentId: 19},
        {profId: 3, studentId: 20},
      ]);
    });
};
