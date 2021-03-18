const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task.js')

const userSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
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
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.getPublicProfile = async function(){
    const obj = this.toObject()
    delete obj.password
    delete obj.tokens
    return obj
}

userSchema.methods.generateToken = async function(){
    const token = jwt.sign({ _id : this._id.toString()},process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email : email})
    if(!user)
        throw new Error('No User Found')

    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch)
        throw new Error('Login Failed')

    return user
}

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

userSchema.pre('remove', async function(next){
    await Task.deleteMany({user: this._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
