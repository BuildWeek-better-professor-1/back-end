const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    findtStudentById
}

function findStudents(prof){
    return db('student list as sl')
        .where(prof)
        .join('users as u', 'users.id', 'sl.profId')
        .join('students as s', 's.id', 'sl.studentId')
        .select(
            'students', 
            'u.firstName as Prof First Name',
            'u.lastName as Prof Last Name',
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
            firstName: student.firstName,
            lastName: student.lastName
        })
        .then(created => {
            db('student list')
                .insert({student_id: created[0], prof_id: student.profId})
            return created[0]
        })
        .then(newStudent => findStudentById(newStudent))
}

