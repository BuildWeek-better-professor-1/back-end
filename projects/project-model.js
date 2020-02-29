const db = require('../database/dbConfig.js')

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    removeProject,
    updateProject
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

function addProject(project){
    return db('projects')
        .insert(project)
        .then(id => getProjectById(id[0]))
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