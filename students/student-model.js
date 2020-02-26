const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    findtStudentById
}

function findStudents(prof){
    return db('student list as sl')
        .where(prof)
        .join('users as u', 'users.id', 'sl.prof_id')
        .join('students as s', 's.id', 'sl.student_id')
        .select(
            'students', 
            'u.first_name as Prof First Name',
            'u.last_name as Prof Last Name',
            'u.id as Prof ID'
            )
}

function findStudentById(id){
    return db('students as s')
        .where({id})
        .first()
}

function addStudent(student){
    return db('students')
        .insert({
            first_name: student.firstName,
            last_name: student.lastName
        })
        .then(created => {
            db('student list')
                .insert({student_id: created[0], prof_id: student.prof_id})
            return created[0]
        })
        .then(newStudent => findStudentById(newStudent))
}

