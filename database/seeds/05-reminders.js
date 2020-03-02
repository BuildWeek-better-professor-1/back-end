function createDate(){
  let randomDay = Math.floor(Math.random() * 3)
  const today = new Date
  return today.setDate(today.getDate() + randomDay)
}


exports.seed = function(knex) {
  return knex('reminders').del()
    .then(function () {
      // Inserts seed entries
      return knex('reminders').insert([
        {id: -1, date: createDate(), projectId: -1, message: 'Get your stuff done'},
        {id: -2, date: createDate(), projectId: -2, message: 'Time to do your project'},
        {id: -3, date: createDate(), projectId: -3, message: 'Do you need help?'},
        {id: -4, date: createDate(), projectId: -4, message: 'Get your stuff done'},
        {id: -5, date: createDate(), projectId: -5, message: 'Time to do your project'},
        {id: -6, date: createDate(), projectId: -6, message: 'Do you need help?'},
        {id: -7, date: createDate(), projectId: -7, message: 'Get your stuff done'},
        {id: -8, date: createDate(), projectId: -8, message: 'Time to do your project'},
        {id: -9, date: createDate(), projectId: -9, message: 'Do you need help?'},
        {id: -10, date: createDate(), projectId: -10, message: 'Get your stuff done'},
        {id: -11, date: createDate(), projectId: -11, message: 'Time to do your project'},
        {id: -12, date: createDate(), projectId: -12, message: 'Do you need help?'},
        {id: -13, date: createDate(), projectId: -13, message: 'Get your stuff done'},
        {id: -14, date: createDate(), projectId: -14, message: 'Time to do your project'},
        {id: -15, date: createDate(), projectId: -15, message: 'Do you need help?'},
        {id: -16, date: createDate(), projectId: -16, message: 'Get your stuff done'},
        {id: -17, date: createDate(), projectId: -17, message: 'Time to do your project'},
        {id: -18, date: createDate(), projectId: -18, message: 'Do you need help?'},
        {id: -19, date: createDate(), projectId: -19, message: 'Get your stuff done'},
        {id: -20, date: createDate(), projectId: -20, message: 'Time to do your project'},
        {id: -21, date: createDate(), projectId: -21, message: 'Do you need help?'},
      ]);
    });
};
