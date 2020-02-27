const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    findStudentById
}

async function findStudents(prof){
    return await db('student list as sl')
        .join('users as u', 'sl.profId', 'u.id')
        .join('students as s', 's.id', 'sl.studentId')
        .select(
            's.id',
            's.firstName',
            's.lastName', 
            'u.firstName as Prof First Name',
            'u.lastName as Prof Last Name',
            'u.id as Prof ID'
            )
        .where('sl.profId', prof)
}

function findStudentById(id){
    console.log(id)
    return db('students')
        .where('students.id', id)
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

