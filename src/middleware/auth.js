const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const auth = async (req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'Lkasarkar')
        const user = await User.findOne({ _id : decoded._id, 'tokens.token':token})
        if(!user){
            throw new Error("error")
        }
        req.token = token
        req.user = user
    }
    catch(e){
        res.send({error : "Please Authenticate"})
    }
    next()
}

module.exports = auth
