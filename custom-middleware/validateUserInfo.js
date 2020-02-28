module.exports = function validateUserInfo (req, res, next){
    const { username, password, firstName, email, type } = req.body

    if(!username || !password || !firstName || !email || !type){
        res.status(400).json({message: 'First Name, Username, Email, Password, and Type fields all required'})
    }else if(type === 'student' && !req.body.profId){
        res.status(400).json({message: 'First Name, Username, Email, Password, Type, and Professor Id fields all required'})
    }else{
        next()
    }
}