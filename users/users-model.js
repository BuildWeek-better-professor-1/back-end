const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById
}

function findBy(filter){
    return db('users')
        .where(filter)
        .select('username', 'password')
        .first()
}

function findById(id){
    return db('users')
        .where({id})
        .select('username')
        .first()
}

function add(user){
    return db('users')
        .insert(user)
        .then(id => findById(id[0]))
}