const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

router.get('/', async (req,res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getEmployee, (req,res) => {
    res.json(res.employee)
})

router.post('/', async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        jobTitle: req.body.jobTitle,
        departmentID: req.body.departmentID,
        projects: {
            projectID: req.body.projects.projectID,
            projectName: req.body.projects.projectName,
            projectRole: req.body.projects.projectRole
        },
        managerID: req.body.managerID
    })

    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// router.patch('/:id',getEmployee, async (req,res) => {
//     if (req.body.name != null) {
//         res.employee.name = req.body.name
//     }
//     if (req.body.subscribedToChannel != null) {
//         res.employee.subscribedToChannel = req.body.subscribedToChannel
//     }
//     try {
//         const updatedEmployee = await res.employee.save()
//         res.json(updatedEmployee)
//     } catch (error) {
//         res.status(400).json({ message: error.message})
//     }
// })

router.delete('/:id',getEmployee, async (req,res) => {
    try {
        await res.employee.deleteOne()
        res.json({ message: 'Deleted Employee'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getEmployee(req, res, next) {
    let employee
    try {
        employee = await Employee.findById(req.params.id)
        if(employee == null) {
            return res.status(404).json({message: 'Cannot find employee'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.employee = employee
    next()
}
module.exports = router