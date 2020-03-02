const db = require('../database/dbConfig.js')

module.exports = {
    addProject,
    getProjects,
    removeProject,
    updateProject,
    getProjectById,
    findStudentProjects
}

function getProjects(){
    return db('projects as p')
        .join('students as s', 's.id', 'p.studentId')
        .select('p.id', 'p.name', 'p.dueDate', 'p.notes', 'p.completed', 's.firstName as First Name', 's.lastName as Last Name')
}

function getProjectById(id){
    return db('projects as p')
        .join('students as s', 'p.studentId', 's.id')
        .select('p.id','p.name', 'p.dueDate', 'p.notes','p.completed', 's.firstName as First Name', 's.lastName as Last Name')
        .where('p.id', id)
        .first()
}

function findStudentProjects(id){
    return db('projects as p')
        .where('p.studentId', id)
        .select('id', 'dueDate as Due Date', 'name', 'notes', 'completed')
}

function addProject(project){
    return db('projects')
        .insert(project, 'id')
        .then(ids => {
            const [id] = ids
            return getProjectById(id)
        })
}

function removeProject(id){
    return db('projects')
        .del()
        .where({id})
}

function updateProject(id, changes){
    return db('projects')
        .where({id})
        .update(changes)
        .then(() => getProjectById(id))
}