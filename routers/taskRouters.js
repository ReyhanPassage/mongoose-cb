const express = require('express')
const router = new express.Router()
const Task = require('../models/taskModel')
const User = require('../models/userModel')

// CREATE TASK
router.post('/tasks/:userId', async (req, res) => {

    try {
        let user = await User.findById(req.params.userId)
        let task = new Task({
                description : req.body.description,
                owner : user._id,
            })

        user.tasks.push(task._id)
        
        await user.save()
        await task.save()
        res.send({
            owner :user,
            createdTask :task
        })

    } catch (error) {
        res.send(error)

    }
    
})

// UPDATE TASK
router.patch('/tasks/:taskid', async (req, res) => {
    
let updates = Object.keys(req.body)
let allowedUpdates = ['description', 'completed']
let result = updates.every(update => {allowedUpdates.includes(update)})

if(!result){
    res.send({err: "Invalid Requist"})
}

    try {
        let task = await task.findById(req.params.taskid)
        updates.forEach(update=>{task[update] = req.body[update]})
        await task.save()
        res.send(task)
        
        // // Cari task berdasarkan id
        // let task = await Task.findById(req.params.taskid)
        // // task = {description, completed}
        // // Update completed menjadi true
        // task.completed = true
        // // Simpan task yang sudah di update
        // await task.save()
        // // Kirim respon
        // res.send({updatedTask : task})

    }catch (error) {
        res.send(error)
    }

    })

    //get data user
    router.get('/tasks/:userId', async (req, res)=>{

        try {
            let resp = await User.find({_id: req.params.userId}).populate({path: 'tasks'}).exec()
            res.send(resp[0].tasks)

        } catch (error) {
            res.send(error)
        }
    })

    // DELETE TASK
    router.delete('/tasks/:taskid', async (req, res) => {

    try {
        let task = await Task.findByIdAndDelete(req.params.taskid)
        
        let user = await User.findById(task.owner)
        
        let index = user.task.indexOf(req.params.taskid)
        // res.send({deletedTask : task})
    } catch (error) {
        res.send(error)
    }

})

module.exports = router