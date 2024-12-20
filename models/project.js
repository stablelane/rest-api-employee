const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
    },
    budget: {
        type: Number
    }
})

module.exports = mongoose.model('Project', projectSchema)