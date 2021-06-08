const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./db/dbconnect')
const notesRouter = require('./route/notesRouter')
const userRouter = require('./route/userRouter')

//server
app.listen(3000, () => {
    console.log('Server Is Running On Port 3000')
})

//db
db()

//middleware
app.use(express.json())
app.use(cookieParser('secret'))
app.use('/notes', notesRouter) 
app.use('/user', userRouter )