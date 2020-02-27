const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById
}

function findBy(filter){
    return db('users')
        .where(filter)
        .first()
}

function findById(id){
    return db('users')
        .where({id})
        .select('id', 'username', 'firstName as First Name', 'lastName as Last Name', 'email')
        .first()
}

function add(user){
    return db('users')
        .insert(user)
        .then(id => findById(id[0]))
}