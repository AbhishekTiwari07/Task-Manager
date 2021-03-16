const express = require('express')
const router = new express.Router()
const Task = require('../models/task.js')
const auth = require('../middleware/auth.js')

router.get('/tasks',auth,async (req,res)=>{
    try{
        const task = await Task.find({user: req.user._id})
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, user: req.user._id })
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.post('/tasks',auth,async (req,res)=>{
    // const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        user: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    try{
        const task = await Task.findOne({ _id:req.params.id , user: req.user._id})

        if(!task)
            return res.status(404).send({})

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id',auth, async (req,res)=>{
    try{
        const task = await Task.deleteOne({_id:req.params.id, user:req.user._id})
        if(!task)
            return res.status(404).send()
        res.send(task)
    }catch(e){
        res.status(400).send({})
    }
})

module.exports = router
