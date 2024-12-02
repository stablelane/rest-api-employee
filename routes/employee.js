const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

// router.get('/', async (req, res) => {
//     try {
//         if(req.query.includeManager == 'true') {
//             const employees = await Employee.find()
//                 .populate('managerID', 'firstName lastName') // Populating manager information
//                 .exec(); // Ensure the query is executed properly
//             res.json(employees)
//         }
//         else {
//             const employees = await Employee.find()
//             res.json(employees)
//         }
        
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/:id', getEmployee, (req, res) => {
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
        projectIDs: req.body.projectIDs,
        managerID: req.body.managerID
    })

    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getEmployee, async (req, res) => {
    const { firstName, lastName, email, phoneNumber, jobTitle, departmentID, projectIDs, managerID } = req.body

    if (firstName) res.employee.firstName = firstName
    if (lastName) res.employee.lastName = lastName
    if (email) res.employee.email = email
    if (phoneNumber) res.employee.phoneNumber = phoneNumber
    if (jobTitle) res.employee.jobTitle = jobTitle
    if (departmentID) res.employee.departmentID = departmentID
    if (projectIDs) res.employee.projectIDs = projectIDs
    if (managerID) res.employee.managerID = managerID

    try {
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.delete('/:id', getEmployee, async (req, res) => {
    try {
        await res.employee.deleteOne()
        res.json({ message: 'Deleted Employee' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getEmployee(req, res, next) {
    let employee
    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.employee = employee
    next()
}


module.exports = router