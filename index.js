const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userRouter = require('./routers/userRouters')
const taskRouter = require('./routers/taskRouters')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 2019 //port heroku atau localhost
const URL_HEROKU = 'mongodb+srv://reyhan:passage@cluster0-pnizg.gcp.mongodb.net/bdg-mongoose?retryWrites=true&w=majority-mongoose'
const URL_LOKAL = 'mongodb://127.0.0.1:27017/bdg-mongoose'

mongoose.connect( URL_HEROKU, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useFindAndModify: true,
    useUnifiedTopology: true
})


app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(taskRouter)


app.get("/", (req, res)=>{
    res.send(`<h1>API running at :${port}</h1>`)
})
app.listen(port, ()=>{
    console.log('running at port: ' +port)
})
