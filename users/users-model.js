const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById,
    updateUser,
    removeUser,
    getProfUsers,
}

function getProfUsers(){
    return db('professorUsers')
        .select('id', 'firstName as First Name', 'lastName as Last Name')
}

function findBy(filter){
    return db(`professorUsers`)
        .where('username', filter)
        .first()
}

function findById(id){
    return db(`professorUsers`)
        .where({id})
        .select('id', 'username', 'firstName as First Name', 'lastName as Last Name', 'email')
        .first()
}

function updateUser(id, changes){
    return db(`professorUsers`)
        .where({id})
        .update(changes)
        .then(() => findById(id))
}

function add(user){
    return db(`professorUsers`)
        .insert(user,'id')
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function removeUser(id){
    return db(`professorUsers`)
        .del()
        .where({id})
}