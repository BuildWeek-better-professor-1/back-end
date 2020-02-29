
exports.seed = function(knex) {
  return knex('reminders').del()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {id: 1, projectId: 1, message: 'Get your stuff done'},
        {id: 2, projectId: 2, message: 'Time to do your project'},
        {id: 3, projectId: 3, message: 'Do you need help?'},
        {id: 4, projectId: 4, message: 'Get your stuff done'},
        {id: 5, projectId: 5, message: 'Time to do your project'},
        {id: 6, projectId: 6, message: 'Do you need help?'},
        {id: 7, projectId: 7, message: 'Get your stuff done'},
        {id: 8, projectId: 8, message: 'Time to do your project'},
        {id: 9, projectId: 9, message: 'Do you need help?'},
        {id: 10, projectId: 10, message: 'Get your stuff done'},
        {id: 11, projectId: 11, message: 'Time to do your project'},
        {id: 12, projectId: 12, message: 'Do you need help?'},
        {id: 13, projectId: 13, message: 'Get your stuff done'},
        {id: 14, projectId: 14, message: 'Time to do your project'},
        {id: 15, projectId: 15, message: 'Do you need help?'},
        {id: 16, projectId: 16, message: 'Get your stuff done'},
        {id: 17, projectId: 17, message: 'Time to do your project'},
        {id: 18, projectId: 18, message: 'Do you need help?'},
        {id: 19, projectId: 19, message: 'Get your stuff done'},
        {id: 20, projectId: 20, message: 'Time to do your project'},
        {id: 21, projectId: 21, message: 'Do you need help?'},
      ]);
    });
};
