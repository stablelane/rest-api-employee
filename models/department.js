const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    }
})

module.exports = mongoose.model('Department', departmentSchema)