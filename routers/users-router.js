const router = require('express').Router()
const Students = require('../students/student-model.js')
const validateUserById = require('../custom-middleware/validateUserById.js')

router.use('/:id', validateUserById)

router.get('/:id/students', (req,res) => {
    const { id } = req.params

    Students.findStudents(id)
        .then(students => {
            console.log(students)
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

module.exports = router