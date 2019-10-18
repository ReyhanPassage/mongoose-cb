const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userRouter = require('./routers/userRouters')
const taskRouter = require('./routers/taskRouters')

const app = express()
const port = procces.env.PORT || 2019 //port heroku atau localhost
const URL = 'mongodb+srv://reyhan:passage@cluster0-pnizg.gcp.mongodb.net/bdg-mongoose?retryWrites=true&w=majority-mongoose'

mongoose.connect( URL, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useFindAndModify: true,
    useUnifiedTopology: true
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res)=>{
    res.send("<h1>API running at :"+port+"</h1>")
})
app.listen(port, ()=>{
    console.log('running at port: ' +port)
})
