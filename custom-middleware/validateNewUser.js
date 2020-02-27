module.exports = function validateNewUser(req, res, next){
    const { username, password, firstName, email } = req.body

    if(!username || !password || !firstName || !email){
        res.status(401).json({message: 'First Name, Username, Email, Password fields all required'})
    }else{
        next()
    }
}