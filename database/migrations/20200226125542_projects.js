exports.up = function(knex) {
  return knex.schema.createTable('projects', proj => {
        proj.increments()
        proj.date('dueDate')
            .notNullable()
        proj.string('name')
            .notNullable()
        proj.string('notes')
        proj.boolean('completed')
            .defaultTo(false)
        proj.integer('studentId')
            .notNullable()
            .references('id')
            .inTable('students')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
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
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reminders')
    .dropTableIfExists('projects')
};
