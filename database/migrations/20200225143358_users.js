
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
        users.string('firstName')
            .notNullable()
        users.string('lastName')
            .defaultTo('')
  })

  .createTable('students', students => {
        students.increments()
        students.string('firstName')
            .notNullable()
        students.string('lastName')
            .notNullable()
  })
  .createTable('student list', sl => {
        sl.integer('profId')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        sl.integer('studentId')
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
