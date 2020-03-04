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
                        id: reminder['Student Id'],
                        'First Name': reminder['First Name'],
                        'Last Name': reminder['Last Name'],
                        type: reminder.type 
                    },
                    reminder: {
                        id: reminder.id,
                        message: reminder.message,
                        date: reminder.date,
                        'Project Name': reminder['Project Name'],
                        "Due Date": reminder['Due Date'],
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
                        dueDate: req.project.dueDate,
                        notes: req.project.notes,
                        completed: req.project.completed
                    },
                    student: {
                        id: studentId,
                        "First Name": req.project["First Name"],
                        "Last Name": req.project["Last Name"]
                    },
                    reminders: reminders.map(r => {
                        return {
                            id: r.id,
                            message: r.message,
                            date: r.date
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