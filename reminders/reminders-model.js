const db = require('../database/dbConfig.js')

module.exports = {
    addReminder,
    getReminders,
    removeReminder,
    updateReminder,
    getRemindersById,
    getRemindersByProject,
}

function getReminders(){
    return db('reminders as r')
        .join('projects as p', 'p.id', 'r.projectId')
}

function getRemindersById(id){
    return db('reminders as r')
        .join('projects as p', 'p.id', 'r.projectId')
        .join('students as s', 's.id', 'p.studentId')
        .select(
            'r.id', 
            'r.message', 
            'r.date',
            'r.read', 
            'p.name as project_name',
            'p.dueDate as due_date',
            'p.notes',
            's.firstName as first_name',
            's.lastName as last_name',
            's.id as student_id',
            's.type'
        )
        .where('r.id', id)
        .first()
}

function getRemindersByProject(id){
    return db('reminders as r')
        .join('projects as p', 'p.id', 'r.projectId')
        .join('students as s', 's.id', 'p.studentId')
        .select(
            'r.id', 
            'r.message', 
            'r.date', 
            'r.read',
            's.id as student_id'
        )
        .where('r.projectId', id)
}

function addReminder(info){
    return db('reminders')
        .insert(info, 'id')
        .then(ids=> {
            const [id] = ids
            return getRemindersById(id)
        })
}

function updateReminder(id, changes){
    return db('reminders')
        .update(changes)
        .where({id})
        .then(() => getRemindersById(id))
}

function removeReminder(id){
    return db('reminders')
        .del()
        .where({id})
}