const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    findStudentById,
    removeStudent
}

async function findStudents(prof){
    return await db('student list as sl')
        .join('professorUsers as u', 'sl.profId', 'u.id')
        .join('students as s', 's.id', 'sl.studentId')
        .select(
            's.id',
            's.firstName',
            's.lastName', 
            'u.firstName as Prof First Name',
            'u.lastName as Prof Last Name',
            )
        .where('sl.profId', prof)
}

function findStudentById(id){
    return db('students')
        .where('students.id', id)
        .first()
}

function addStudent(student){
    let id = ''
    return db('students')
        .insert({
            firstName: student.firstName,
            lastName: student.lastName
        })
        .then(created => {
            id = created[0]
            return db('student list')
                .insert({studentId: created[0], profId: student.profId})
        })
        .then(() => findStudentById(id))
}

function removeStudent(id){
    return db('students')
        .where({id})
        .del()
}
