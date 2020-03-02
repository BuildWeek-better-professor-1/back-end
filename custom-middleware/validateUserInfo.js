module.exports = function validateUserInfo (req, res, next){
    const { username, password, firstName, email } = req.body

    if(!username || !password || !firstName || !email){
        res.status(400).json({message: 'First Name, Username, Email, Password fields all required'})
    }else{
        next()
    }
}