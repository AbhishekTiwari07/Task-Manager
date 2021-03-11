const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid Email")
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        lowercase:true,
        validate(value){
            if(value=="password")
                throw new Error("Password not Allowed")
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
                throw new Error("Enter valid age")
        }
    }
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
