require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const employeesRouter = require('./routes/employee')
app.use('/employee', employeesRouter)

const departmentsRouter = require('./routes/department')
app.use('/department', departmentsRouter)

const projectsRouter = require('./routes/project')
app.use('/project', projectsRouter)

app.listen(3000, () => {
    console.log('Server Started')
})