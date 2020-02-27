const router = require('express').Router()
const Students = require('../students/student-model.js')
const validateStudentById = require('../custom-middleware/validateStudentById.js')

router.use('/:id', validateStudentById)


router.get('/:id', (req,res) => {
    res.status(200).json({
        data: {
            student: req.student
        }
    })
})

module.exports = router