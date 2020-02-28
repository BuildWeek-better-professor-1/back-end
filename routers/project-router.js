const router = require('express').Router()
const Projects = require('../projects/project-model.js')
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

router.delete('/:id', (req, res) => {
    const {id} = req.params
    console.log(req.project)

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