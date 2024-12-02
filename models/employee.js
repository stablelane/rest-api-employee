const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    EmployeeID: {
        type: String,
        required: true,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    HireDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    jobTitle: {
        type: String,
        required: true
    },
    departmentID: {
        type: Number,
        required: true
    },
    projects: {
        projectID: { 
            type: Number,
            required: true,
        },
        projectName: {
            type: String,
            required: true,
        },
        projectRole: {
            type: String,
            required: true
        }
    },
    managerID: {
        type: String
    },
})

module.exports = mongoose.model('Employee', employeeSchema)