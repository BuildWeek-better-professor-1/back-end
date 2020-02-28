const Users = require('../users/users-model.js')

module.exports = async function(req, res, next){
    const { id } = req.params
    const type = req.baseUrl.includes('professor') ? 'professor' : 'student'
    try {
        const user = await Users.findById(id, type)
        if(user){
            req.user = user
            next()
        }else {
            res.status(400).json({message: 'Invalid User ID'})
        }
    }catch(err){
        res.status(500).json({
            error: err,
            errorMessage: `There was an error with your ${req.method} request`
        })
    }
}