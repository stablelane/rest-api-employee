const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
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
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    projectIDs: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', 
        required: true
    }],
    managerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' 
    },
})

employeeSchema.pre('save', async function(next) {
    try {
        if(this.departmentID) {
            const departmentExists = await mongoose.model('Department').exists({_id: this.departmentID})
            if (!departmentExists) {
                throw new Error("Invalid departmentID: Department doesn't exist in the database")
            }
        }
        if(this.managerID) {
            const managerExists = await mongoose.model('Employee').exists({_id: this.managerID})
            if (!managerExists) {
                throw new Error("Invalid managerID: Manager doesn't exist in the database")
            }
        }
        for (const projectID of this.projectIDs) {
            const projectExists = await mongoose.model('Project').exists({_id: projectID})
            if(!projectExists) {
                throw new Error("Invalid projectID: Project doesn't exist in the database")
            }
        }
        next()
    } catch (error) {
        next(error)
    }
})
module.exports = mongoose.model('Employee', employeeSchema)