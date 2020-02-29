const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById,
    updateUser,
    removeUser,
    getProfUsers,
    getStudentUsers,
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

function updateUser(id, changes){
    return db(`${changes.type}Users`)
        .where({id})
        .update(changes)
        .then(() => findById(id, changes.type))
}

function add(user){
    return db(`${user.type}Users`)
        .insert(user,['id'])
        .then(id => findById(id[0], user.type))
}

function removeUser(id, type){
    return db(`${type}Users`)
        .del()
        .where({id})
}