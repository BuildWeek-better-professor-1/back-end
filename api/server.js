const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('../auth/restricted-middleware.js')

const authRouter = require('../routers/auth-router.js')
const profRouter = require('../routers/professor-router.js')
const studentRouter = require('../routers/student-router.js')
const projectRouter = require('../routers/project-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter)
server.use('/api/users/professor', profRouter)
server.use('/api/students', restricted, studentRouter)
server.use('/api/projects', restricted, projectRouter)

server.get('/', (req, res) => {
    res.send({hello: `Let's get this f*cking party started`})
})

module.exports = server