const Projects = require('../projects/project-model.js')

module.exports = async function(req, res, next){
    const { id } = req.params
    try {
        const project = await Projects.getProjectById(id)
        if(project){
            console.log(project)
            req.project = project
            next()
        }else {
            res.status(400).json({message: 'Invalid project ID'})
        }
    }catch(err){
        res.status(500).json({
            error: err,
            errorMessage: `There was an error with your ${req.method} request`
        })
    }
}