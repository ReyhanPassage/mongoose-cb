const express = require('express')
const router = new express.Router()
const User = require('../models/userModel')
const multer = require('multer')
const sharp = require('sharp')


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Format file harus jpg, jpeg atau png'))
        }

        cb(null, true)
    }
})

//Post Avatar

router.post('/users/avatar/:userId' , upload.single('avatar'), async (req, res)=>{
    try {
        let buffer = await sharp(req.file.buffer).resize({width:250}).png().toBuffer()
        let user = await User.findById(req.params.userId)
        user.avatar = buffer
        user.save()
        res.send("Upload berhasil")  
    } catch (error) {
        res.send(error)
        
    }
})

//get avatar

router.get('/users/avatar/:userId', async (req, res)=>{
    try {
        let user = await User.findById(req.params.userId)
       
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (error) {
        res.send(error)
    }
})

//create one user
router.post('/users', (req, res)=>{

    const user = new User(req.body)

user.save()
.then((resp)=>{res.send(resp)})
.catch((err)=>{res.send (err) })

})

//read one user by id
router.get('/users/:userId', async (req, res)=>{
    try {
        
        const user = await User.findById(req.params.userid)
        res.send({
            user,
            avatar: `http://localhost:2019/users/avatar/${req.params.userid}`
        })
    } catch (error) {
        res.send(error)
    }
})

//read all user
router.get('/users', async (req, res) => {

    try {
        let users = await User.find({})
        res.send(users)

    } catch (error) {
        res.send(error)

    }

})
//delete one user

router.delete('/users/:userId', async (req, res)=>{
   
try {
    const resp = await User.deleteOne({_id : req.params.userId})
    res.send(resp)
} catch (error) {
    res.send(error)
}

})

// update user
router.patch('/users/:userId', async (req, res)=>{
    let update = Object.keys(req.body)
    let allowedUpdate = ['name', 'email', 'password','age']

    let result = updates.every(update => {return allowedUpdates.includes(update)})

    // Jika ada field yang akan di edit selain [ 'name', 'email', 'password', 'age' ]

    if(!result){
        return res.send({err: "Invalid Request"})
    }

try {
    let user = await User.findById(req.params.userId)
    // Update user

            // user.name = req.body.name
            // user.email = req.body.email
            // user.password = req.body.password
            // user.age = req.body.age

        // updates = [ 'name', 'email', 'password', 'age' ]
        // user = {name, email, password, age}
        updates.forEach((val) => { user[val] = req.body[val] })

        /*
            val = 'password'
            user['email'] = req.body['email']
        */

        await user.save()

        res.send(user)
    
} catch (error) {
    res.send(error)
}

    
    // const resp = await User.update({_id : req.params.userId}, 
    //     {$set: {
    //         username: req.body.username,
    //         name: req.body.name,
    //         age : req.body.age,
    //         password : req.body.password
    //     } } )


})
// login user
router.post('/users/login', (req, res)=>{

        User.login(req.body.email, req.body.password)
        .then(resp=>{
            res.send({
                kondisi: "berhasil",
                pesan: resp})
        })
        .catch(error=>{
            res.send({
                pesan: "gagal",
                error: error.message
            })
        })

})

module.exports = router

//delete task, delete tasks yang ada di user juga