const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById,
    getProfUsers,
    getStudentUsers
}

function getProfUsers(){
    return db('professorUsers')
        .select('id', 'firstName as First Name', 'lastName as Last Name')
}

function getStudentUsers(){
    return db('studentUsers')
}

function findBy(filter, type){
    return db(`${type}Users`)
        .where('username', filter)
        .first()
}

function findById(id, type){
    return db(`${type}Users`)
        .where({id})
        .select('id', 'username', 'firstName as First Name', 'lastName as Last Name', 'email', 'type')
        .first()
}

function add(user){
    return db(`${user.type}Users`)
        .insert(user)
        .then(id => findById(id[0], user.type))
}