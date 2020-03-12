const router = require('express').Router()
const Projects = require('../projects/project-model.js')
const Reminders = require('../reminders/reminders-model.js')
const validateProjectById = require('../custom-middleware/validateProjectById.js')

router.use('/:id', validateProjectById)

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json({
                data: {
                    projects
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
            project: {
                ...req.project
            }
        }
    })
})

router.post('/:id/reminders', (req, res) => {
    const info = {...req.body, projectId: req.params.id}

    if(!info.message || !info.date || !info.projectId){
        res.status(400).json({message: 'Required info missing'})
    }
    Reminders.addReminder(info)
        .then(reminder => {
            res.status(201).json({
                data: {
                    message: 'Reminder Successfully Created',
                    student: {
                        id: reminder.student_id,
                        first_name: reminder.first_name,
                        last_name: reminder.last_name,
                        type: reminder.type 
                    },
                    reminder: {
                        id: reminder.id,
                        message: reminder.message,
                        date: reminder.date,
                        read: r.read,
                        project_name: reminder.project_name,
                        due_date: reminder.due_date,
                        notes: reminder.notes
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

router.get('/:id/reminders', (req, res) => {
    const {id} = req.params

    Reminders.getRemindersByProject(id)
        .then(reminders => {
            const studentId = reminders[0]['Student Id']
            res.status(200).json({
                data: {
                    project: {
                        id: req.project.id,
                        name: req.project.name,
                        due_date: req.project.due_date,
                        notes: req.project.notes,
                        completed: req.project.completed
                    },
                    student: {
                        id: studentId,
                        first_name: req.project.first_name,
                        last_name: req.project.last_name
                    },
                    reminders: reminders.map(r => {
                        return {
                            id: r.id,
                            message: r.message,
                            date: r.date,
                            read: r.read
                        }
                    })
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
    const info = req.body

    if(!info.name || !info.notes || !info.dueDate){
        res.status(400).json({message: 'Required fields missing'})
    }
    Projects.updateProject(id, info)
        .then(project => {
            res.status(200).json({
                data: {
                    message: 'Project successfully updated',
                    project: {
                        ...project
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

router.delete('/:id', (req, res) => {
    const {id} = req.params

    Projects.removeProject(id)
        .then(() => {
            res.status(200).json({
                data: {
                    message: 'Project Successfully Deleted',
                    project: {
                        ...req.project
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

module.exports = router