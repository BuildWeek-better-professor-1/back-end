const router = require('express').Router()
const Projects = require('../projects/project-model.js')
const validateProjectById = require('../custom-middleware/validateProjectById.js')

router.use('/:id', validateProjectById)

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json({
                data: {
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
                errorMessage: `There was an error with your ${req.method} request`
            })
        })
})

router.get('/:id', (req, res) => {
    res.status(200).json({
        data: {
            project: {
                ...req.project,
                completed: req.project.completed === 1 ? true : false
            }
        }
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
                        ...req.project,
                        completed: req.project.completed === 1 ? true : false
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