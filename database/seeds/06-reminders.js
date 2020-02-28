
exports.seed = function(knex) {
  return knex('reminders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {id: 1, dueDate: Date.now() + (86400000 * 1), projectId: 1, message: 'Get your stuff done'},
        {id: 2, dueDate: Date.now() + (86400000 * 3), projectId: 2, message: 'Time to do your project'},
        {id: 3, dueDate: Date.now() + (86400000 * 1), projectId: 3, message: 'Do you need help?'},
        {id: 4, dueDate: Date.now() + (86400000 * 3), projectId: 4, message: 'Get your stuff done'},
        {id: 5, dueDate: Date.now() + (86400000 * 1), projectId: 5, message: 'Time to do your project'},
        {id: 6, dueDate: Date.now() + (86400000 * 1), projectId: 6, message: 'Do you need help?'},
        {id: 7, dueDate: Date.now() + (86400000 * 2), projectId: 7, message: 'Get your stuff done'},
        {id: 8, dueDate: Date.now() + (86400000 * 1), projectId: 8, message: 'Time to do your project'},
        {id: 9, dueDate: Date.now() + (86400000 * 4), projectId: 9, message: 'Do you need help?'},
        {id: 10, dueDate: Date.now() + (86400000 * 1), projectId: 10, message: 'Get your stuff done'},
        {id: 11, dueDate: Date.now() + (86400000 * 1), projectId: 11, message: 'Time to do your project'},
        {id: 12, dueDate: Date.now() + (86400000 * 1), projectId: 12, message: 'Do you need help?'},
        {id: 13, dueDate: Date.now() + (86400000 * 2), projectId: 13, message: 'Get your stuff done'},
        {id: 14, dueDate: Date.now() + (86400000 * 1), projectId: 14, message: 'Time to do your project'},
        {id: 15, dueDate: Date.now() + (86400000 * 1), projectId: 15, message: 'Do you need help?'},
        {id: 16, dueDate: Date.now() + (86400000 * 2), projectId: 16, message: 'Get your stuff done'},
        {id: 17, dueDate: Date.now() + (86400000 * 3), projectId: 17, message: 'Time to do your project'},
        {id: 18, dueDate: Date.now() + (86400000 * 1), projectId: 18, message: 'Do you need help?'},
        {id: 19, dueDate: Date.now() + (86400000 * 2), projectId: 19, message: 'Get your stuff done'},
        {id: 20, dueDate: Date.now() + (86400000 * 3), projectId: 20, message: 'Time to do your project'},
        {id: 21, dueDate: Date.now() + (86400000 * 2), projectId: 21, message: 'Do you need help?'},
      ]);
    });
};
