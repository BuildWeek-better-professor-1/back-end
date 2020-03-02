const Students = require('../students/student-model.js')

module.exports = async function(req, res, next){
    const { id } = req.params
    try {
        const student = await Students.findStudentById(id)
        if(student){
            req.student = student
            next()
        }else {
            res.status(400).json({message: 'Invalid Student ID'})
        }
    }catch(err){
        res.status(500).json({
            error: err,
            errorMessage: `There was an error with your ${req.method} request`
        })
    }
}