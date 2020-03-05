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
        .select(
            'p.id', 
            'p.name', 
            'p.dueDate as due_date', 
            'p.notes', 
            'p.completed', 
            's.firstName as first_name', 
            's.lastName as last_name'
        )
}

function getProjectById(id){
    return db('projects as p')
        .join('students as s', 'p.studentId', 's.id')
        .select(
            'p.id',
            'p.name', 
            'p.dueDate as due_date', 
            'p.notes',
            'p.completed', 
            's.firstName as first_name', 
            's.lastName as last_name'
        )
        .where('p.id', id)
        .first()
}

function findStudentProjects(id){
    return db('projects as p')
        .where('p.studentId', id)
        .select(
            'id', 
            'dueDate as due_date', 
            'name', 
            'notes', 
            'completed'
        )
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