// Imports
const knex = require('knex')

const env = process.env.DB_ENV || 'development'
const config = require('../knexfile.js')

// Select development object 
const db = knex(config[env])

module.exports = db