const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
var path = require('path')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const dirViews = path.join(__dirname,'../views')
const dirPublic = path.join(__dirname,'../public')
app.use(express.static(dirPublic))
app.set('views', dirViews)
app.set('view engine', 'hbs')

app.listen(port, ()=>{
    console.log("Server is up at "+port)
})
