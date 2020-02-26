
exports.up = function(knex) {
  return knex.schema.createTable('projects', proj => {
        proj.increments()
        proj.date('due_date')
            .notNullable()
        proj.string('name')
            .notNullable()
        proj.string('notes')
        proj.integer('student_id')
            .notNullable()
            .references('id')
            .inTable('students')
        proj.integer('prof_id')
            .notNullable()
            .references('id')
            .inTable('users')
  })
  .createTable('reminders', reminders => {
        proj.increments()
        proj.date('date')
            .notNullable()
        proj.string('message')
            .notNullable()
        proj.integer('project_id')
            .notNullable()
            .references('id')
            .inTable('projects')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reminders')
    .draopTableIfExists('projects')
};
