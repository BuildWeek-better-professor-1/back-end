const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Students = require('../students/student-model.js')
const Users = require('../users/users-model.js')
const restricted = require('../auth/restricted-middleware.js')
const validateUserById = require('../custom-middleware/validateUserById.js')

router.use('/:id', [restricted, validateUserById])

router.get('/', (req, res) => {
    Users.getProfUsers()
        .then(users => {
            res.status(200).json({
                data: {
                    professors: [...users]
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
            user: req.user
        }
    })
})

router.get('/:id/students', (req,res) => {
    const { id } = req.params

    Students.findStudents(id)
        .then(students => {
            res.status(200).json({
                data: {
                    students
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

router.post('/:id/students', (req, res) => {
    const info = {...req.body, profId: req.params.id}

    if(!info.firstName || !info.lastName){
        res.status(400).json({message: 'First and Last name information is required'})
    }
    
    Students.addStudent(info)
        .then(saved => {
            res.status(201).json({
                data: {
                    message: 'New Student Successfully Created', 
                    student: {
                        id: saved.id,
                        "First Name": saved.firstName,
                        "Last Name": saved.lastName
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