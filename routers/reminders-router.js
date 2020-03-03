const router = require('express').Router()
const Reminders = require('../reminders/reminders-model.js')
const validateReminderById = require('../custom-middleware/validateReminderById.js')

router.use('/:id', validateReminderById)

router.get('/', (req, res) => {

    Reminders.getReminders()
        .then(reminders => {
            res.status(200).json({
                data: {
                    reminders
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
            reminder: {
                ...req.reminder
            }
        }
    })
})

router.put('/:id', (req,res) => {
    if(!req.body){
        res.status(400).json({message: 'Required info missing'})
    }
    const info = req.body
    const {id} = req.params
    Reminders.updateReminder(id, info)
        .then(reminder => {
            res.status(200).json({
                data: {
                    message: 'Reminder Successfully Updated',
                    reminder
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

    Reminders.removeReminder(id)
        .then(() => {
            res.status(200).json({
                data: {
                    message: 'Reminder Successfully Deleted',
                    reminder: {
                        ...req.reminder
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