const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const User = require('../models/user.js')
const multer = require('multer')

const upload = multer({
    dest: "images",
    limits:{
        fileSize: 1000000
    }
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/users/me', auth ,async (req,res)=>{
    try{
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// router.get('/users/:id',auth,async (req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        const newUser = await user.getPublicProfile()
        res.send({ user:newUser,token})
    }
    catch(e){
        res.send(e)
    }
})

router.post('/user/me/image', upload.single('image'), (req,res)=>{
    res.send()
})

router.post('/users/logout',auth, async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send({status : "Logged Out"})
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll',auth, async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
     try{
         await user.save()
         // const token = await user.generateToken()
         res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/update/me',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    try{
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user)
        //     return res.status(404).send()
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send({})
    }
})

module.exports = router
