
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
        users.increments()
        users.string('username')
            .unique()
            .notNullable()
        users.string('password')
            .notNullable()
        users.string('email')
            .unique()
            .notNullable()
        users.string('first name')
            .notNullable()
        users.string('last name')
        users.string('type')
            .notNullable()
  })

  .createTable('students', students => {
        students.increments()
        students.string('first name')
            .notNullable()
        students.string('last name')
            .notNullable()
  })
  .createTable('student list', sl => {
        sl.integer('prof_id')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        sl.integer('student_id')
            .references('id')
            .inTable('students')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('student list')
        .dropTableIfExists('students')
        .dropTableIfExists('users')
};
