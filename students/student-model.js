const db = require('../database/dbConfig.js')

module.exports = {
    addStudent,
    findStudents,
    updateStudent,
    removeStudent,
    findStudentBy,
    findStudentById,
    findStudentReminders
}

async function findStudents(prof){
    return await db('student list as sl')
        .join('professorUsers as p', 'sl.profId', 'p.id')
        .join('students as s', 's.id', 'sl.studentId')
        .select(
            's.id',
            's.firstName',
            's.lastName', 
            's.registered',
            's.type',
            'p.firstName as prof_first_name',
            'p.lastName as prof_last_name',
            )
        .where('sl.profId', prof)
}

function findStudentBy(filter){
    return db('students')
        .where('username', filter)
        .first()
}

function findStudentById(id){
    return db('students')
        .where('students.id', id)
        .select(
            'id',
            'username',
            'firstName as first_name', 
            'lastName as last_name',
            'email',
            'type',
            'registered'
            )
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
            'p.name as project_name', 
            'p.dueDate as due_date',
            'p.notes',
        )
        .where('s.id', id)
}

function addStudent(student){
    let studentId = ''
    return db('students')
        .insert({
            firstName: student.firstName,
            lastName: student.lastName
        },'id')
        .then(ids => {
            const [id] = ids
            studentId = id
            return db('student list')
                .insert({studentId: id, profId: student.profId})
        })
        .then(() => findStudentById(studentId))
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
