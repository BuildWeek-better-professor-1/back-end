const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    updateStudent,
    removeStudent,
    findStudentById,
    findStudentReminders
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

function findStudentReminders(id){
    return db('students as s')
        .join('projects as p', 'p.studentId', 's.id')
        .join('reminders as r', 'r.projectId', 'p.id')
        .select(
            'r.id',
            'r.message',
            'r.date',
            'p.name as Project Name', 
            'p.dueDate as Due Date',
            'p.notes',
        )
        .where('s.id', id)
}

function addStudent(student){
    let id = ''
    return db('students')
        .insert({
            firstName: student.firstName,
            lastName: student.lastName
        },['id'])
        .then(created => {
            id = created[0]
            return db('student list')
                .insert({studentId: created[0], profId: student.profId})
        })
        .then(() => findStudentById(id))
}

function updateStudent(id, changes){
    return db('students')
        .where({id})
        .update(changes)
        .then(() => findStudentById(id))
}

function removeStudent(id){
    return db('students')
        .where({id})
        .del()
}
