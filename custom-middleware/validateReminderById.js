const Reminders = require('../reminders/reminders-model.js')

module.exports = async function(req, res, next){
    const { id } = req.params
    try {
        const reminder = await Reminders.getRemindersById(id)
        if(reminder){
            req.reminder = reminder
            next()
        }else {
            res.status(400).json({message: 'Invalid reminder ID'})
        }
    }catch(err){
        res.status(500).json({
            error: err,
            errorMessage: `There was an error with your ${req.method} request`
        })
    }
}