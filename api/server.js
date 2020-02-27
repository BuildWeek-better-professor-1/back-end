const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('../auth/restricted-middleware.js')

const authRouter = require('../routers/auth-router.js')
const userRouter = require('../routers/users-router.js')
const studentRouter = require('../routers/student-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter)
server.use('/api/users', restricted, userRouter)
server.use('/api/students', restricted, studentRouter)

server.get('/', (req, res) => {
    res.send({hello: `Let's get this f*cking party started`})
})

module.exports = server