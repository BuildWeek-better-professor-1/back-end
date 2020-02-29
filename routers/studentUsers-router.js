const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model.js')
const restricted = require('../auth/restricted-middleware.js')
const validateUserById = require('../custom-middleware/validateUserById')

router.use('/:id', [restricted, validateUserById])

router.get('/', (req, res) => {
    Users.getStudentUsers()
        .then(users => {
            res.status(200).json({
                data: {
                    studentUsers: [...users]
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

router.get('/:id', (req, res) => {
    res.status(200).json({
        data: {
            user: {
                id: req.user.id,
                username: req.user.username,
                "First Name": req.user["First Name"],
                "Last Name": req.user["Last Name"],
                email: req.user.email,
                type: req.user.type
            }
        }
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body 
    if(!changes){
        res.status(400).json({message: 'Required information missing'})
    }else if(changes.password){
        const hash = bcrypt.hashSync(changes.password, 8)
        changes.password = hash
    }
    Users.updateUser(id, changes)
        .then(user => {
            res.status(200).json({
                data: {
                    message: 'User Successfully Updated',
                    user
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

router.delete('/:id', (req,res) => {
    const {type} = req.user
    const {id} = req.params

    Users.removeUser(id, type)
        .then(() => {
            res.status(201).json({
                data: {
                    message: 'User Successfully Deleted',
                    user: {
                        ...req.user
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

module.exports = router
