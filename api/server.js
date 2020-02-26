const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('../auth/auth-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.send({hello: `Let's get this f*cking party started`})
})

module.exports = server