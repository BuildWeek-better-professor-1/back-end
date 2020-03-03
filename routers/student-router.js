const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')
const Students = require('../students/student-model.js')
const Projects = require('../projects/project-model.js')
const restricted = require('../auth/restricted-middleware.js')
const validateStudentById = require('../custom-middleware/validateStudentById.js')

router.use('/:id', validateStudentById)


router.get('/:id', restricted, (req,res) => {
    res.status(200).json({
        data: {
            student: {
                "id": req.student.id,
                "First Name": req.student['First Name'],
                "Last Name": req.student['Last Name'],
                username: req.student.username,
                email: req.student.email,
                registered: req.student.registered
            }
        }
    })
})

router.get('/:id/projects', restricted, (req, res) => {
    const { id } = req.params
    Projects.findStudentProjects(id)
        .then(projects => {
            res.status(200).json({
                data: {
                    student: {
                        "id": req.student.id,
                        "First Name": req.student['First Name'],
                        "Last Name": req.student['Last Name']
                    },
                    projects
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} requestt`
            })
        })
})

router.get('/:id/reminders', restricted, (req, res) => {
    const {id} = req.params
    Students.findStudentReminders(id)
        .then(reminders => {
            res.status(200).json({
                data: {
                    student: {
                        id: req.student.id,
                        "First Name": req.student['First Name'],
                        "Last Name": req.student['Last Name']
                    },
                    reminders
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} requestt`
            })
        })
})

router.post('/:id/projects', restricted, (req, res) => {
    const info = {...req.body, studentId: req.params.id}

    if(!info.name || !info.dueDate){
        res.status(400).json({message: 'Name and Due Date are required'})
    }
    Projects.addProject(info)
        .then(project => {
            res.status(201).json({
                data: {
                    message: 'Proejct Successfully Created',
                    project: {
                        ...project
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} requestt`
            })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const info = req.body ? req.body : false
    const {register} = req.query

    if(!info){
        res.status(400).json({message: 'Required information is missing'})
    }else if(info.password){
        const hash = bcrypt.hashSync(info.password, 8)
        info.password = hash
    }
    Students.updateStudent(id, info)
        .then(student => {
            const token = register ? generateToken(student) : null
            res.status(200).json({
                data: {
                    message: 'Student Successfully Updated',
                    student: {
                        ...student
                    },
                    token
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} requestt`
            })
        })
})

router.delete('/:id', restricted, (req, res) => {
    const {id} = req.params
    console.log(req.student)

    Students.removeStudent(id)
        .then(() => {
            res.status(200).json({
                data: {
                    message: 'Student Successfully deleted',
                    student: {
                        "id": req.student.id,
                        "First Name": req.student['First Name'],
                        "Last Name": req.student['Last Name'],
                        username: req.student.username,
                        email: req.student.email,
                        registered: req.student.registered
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

// Generate Token

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1h'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router