module.exports = function validateNewUser(req, res, next){
    const { username, password, firstName, email, type } = req.body

    if(!username || !password || !firstName || !email || !type){
        res.status(400).json({message: 'First Name, Username, Email, Password, and Type fields all required'})
    }else{
        next()
    }
}