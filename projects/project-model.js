const db = require('../database/dbConfig.js')

module.exports = {
    getProjects,
    getProjectById,
    addProject,
    removeProject
}

function getProjects(){
    return db('projects as p')
        .join('students as s', 's.id', 'p.studentId')
        .select('p.id', 'p.name', 'p.dueDate', 'p.notes', 's.firstName as First Name', 's.lastName as Last Name')
}

function getProjectById(id){
    console.log(id)
    return db('projects as p')
        .join('students as s', 'p.studentId', 's.id')
        .select('p.id','p.name', 'p.dueDate', 'p.notes', 's.firstName as First Name', 's.lastName as Last Name')
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