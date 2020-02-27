
exports.up = function(knex) {
  return knex.schema.createTable('projects', proj => {
        proj.increments()
        proj.date('dueDate')
            .notNullable()
        proj.string('name')
            .notNullable()
        proj.string('notes')
        proj.integer('studentId')
            .notNullable()
            .references('id')
            .inTable('students')
  })
  .createTable('reminders', reminders => {
        reminders.increments()
        reminders.date('date')
            .notNullable()
        reminders.string('message')
            .notNullable()
        reminders.integer('projectId')
            .notNullable()
            .references('id')
            .inTable('projects')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reminders')
    .dropTableIfExists('projects')
};
