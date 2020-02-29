const router = require('express').Router()
const Students = require('../students/student-model.js')
const Projects = require('../projects/project-model.js')
const validateStudentById = require('../custom-middleware/validateStudentById.js')

router.use('/:id', validateStudentById)


router.get('/:id', (req,res) => {
    res.status(200).json({
        data: {
            student: {
                "id": req.student.id,
                "First Name": req.student.firstName,
                "Last Name": req.student.lastName
            }
        }
    })
})

router.get('/:id/projects', (req, res) => {
    const { id } = req.params
    Students.findStudentProjects(id)
        .then(projects => {
            res.status(200).json({
                data: {
                    student: {
                        "id": req.student.id,
                        "First Name": req.student.firstName,
                        "Last Name": req.student.lastName
                    },
                    projects: projects.map(project => {
                        return{
                            ...project,
                            completed: project.completed === 1 ? true : false
                        }
                    })
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

router.post('/:id/projects', (req, res) => {
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
                        ...project,
                        completed: project.completed === 1 ? true : false
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
    const info = req.body

    if(!info.firstName || !info.lastName){
        res.status(400).json({message: 'First name, Last name information is required'})
    }
    Students.updateStudent(id, info)
        .then(student => {
            res.status(200).json({
                message: 'Student Successfully Updated',
                student
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                errorMessage: `There was an error with your ${req.method} requestt`
            })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    Students.removeStudent(id)
        .then(() => {
            res.status(200).json({
                data: {
                    message: 'Student Successfully deleted',
                    student: {
                        "id": req.student.id,
                        "First Name": req.student.firstName,
                        "Last Name": req.student.lastName
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