const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    departmentID: { 
        type: Number,
        required: true,
    },
    departmentName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    }
})

module.exports = mongoose.model('Departments', departmentSchema)