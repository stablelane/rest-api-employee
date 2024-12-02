const express = require('express')
const router = express.Router()
const Department = require('../models/department')


router.get('/', async (req,res) => {
    try {
        const department = await Department.find()
        res.json(department)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getDepartment, (req,res) => {
    res.json(res.department)
})

router.post('/', async (req, res) => {
    const department = new Department({
        departmentID: req.body.departmentID,
        departmentName: req.body.departmentName,
        location: req.body.location
    })

    try {
        const newDepartment = await department.save()
        res.status(201).json(newDepartment)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// router.patch('/:id',getDepartment, async (req,res) => {
//     if (req.body.name != null) {
//         res.department.name = req.body.name
//     }
//     if (req.body.subscribedToChannel != null) {
//         res.department.subscribedToChannel = req.body.subscribedToChannel
//     }
//     try {
//         const updatedEmployee = await res.department.save()
//         res.json(updatedEmployee)
//     } catch (error) {
//         res.status(400).json({ message: error.message})
//     }
// })

router.delete('/:id',getDepartment, async (req,res) => {
    try {
        await res.department.deleteOne()
        res.json({ message: 'Deleted Department'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getDepartment(req, res, next) {
    let department
    try {
        department = await Department.findById(req.params.id)
        if(department == null) {
            return res.status(404).json({message: 'Cannot find department'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.department = department
    next()
}
module.exports = router