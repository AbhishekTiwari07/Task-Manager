const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
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

module.exports=User
