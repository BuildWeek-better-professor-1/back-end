
exports.up = function(knex) {
  return knex.schema.createTable('professorUsers', users => {
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
        students.string('username')
            .unique()
        students.string('email')
        students.string('password')
        students.boolean('registered')
            .defaultTo(false)
  })
  .createTable('student list', sl => {
        sl.integer('profId')
            .references('id')
            .inTable('professorUsers')
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
        .dropTableIfExists('professorUsers')
};
