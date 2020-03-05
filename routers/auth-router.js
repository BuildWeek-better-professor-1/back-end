const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')
const Users = require('../users/users-model.js')
const Students = require('../students/student-model.js')
const validateUserInfo = require('../custom-middleware/validateUserInfo.js')

router.post('/register', validateUserInfo, (req,res) => {
    let user = req.body


    const hash = bcrypt.hashSync(user.password, 8)
    user.password = hash

    Users.add(user)
        .then(saved => {
            const token = generateToken(saved)
            res.status(201).json({
                data: {
                    message: `Welcome ${saved.first_name}`,
                    user: {...saved},
                    token
                }
            })
        })
        .catch(({ name, code, message, stack })=> {
            res.status(500).json({ name, code, message, stack })
        })
    
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    const {type} = req.query

    if(!username || !password){
        res.status(400).json({errorMessage: `Username and password required`})
    }else if(type==='p'){
        Users.findBy(username)
            .then(saved => {
                if(saved && bcrypt.compareSync(password, saved.password)){
                    const token = generateToken(saved)
                    res.status(200).json({
                        data: {
                            message: `Welcome ${saved.firstName}`,
                            user: {
                                id: saved.id,
                                username: saved.username,
                                first_name: saved.firstName,
                                last_name: saved.lastName,
                                email: saved.email,
                                type: saved.type
                            },
                            token
                        }
                    })
                }else{
                    res.status(401).json({message: `Invalid credentials`})
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    errorMessage: `There was an issue with your ${req.method} request`
                })
            })
    }else{
        Students.findStudentBy(username)
        .then(saved => {
            if(saved && bcrypt.compareSync(password, saved.password)){
                const token = generateToken(saved)
                res.status(200).json({
                    data: {
                        message: `Welcome ${saved.firstName}`,
                        user: {
                            id: saved.id,
                            username: saved.username,
                            first_name: saved.firstName,
                            last_name: saved.lastName,
                            email: saved.email,
                            registered: saved.registered,
                            type: saved.type
                        },
                        token
                    }
                })
            }else{
                res.status(401).json({message: `Invalid credentials`})
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an issue with your ${req.method} request`
            })
        })
    }
})


// Generate Token

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1 day'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router