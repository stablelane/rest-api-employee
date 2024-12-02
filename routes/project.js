const express = require('express')
const router = express.Router()
const Project = require('../models/project')

router.get('/', async (req,res) => {
    try {
        const project = await Project.find()
        res.json(project)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

router.get('/:id', getProject, (req,res) => {
    res.json(res.department)
})

router.post('/', async (req, res) => {
    const project = new Project({
        projectID: req.body.projectID,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        budget: req.body.budget
    })

    try {
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// router.patch('/:id',getProject, async (req,res) => {
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

router.delete('/:id',getProject, async (req,res) => {
    try {
        await res.project.deleteOne()
        res.json({ message: 'Deleted Project'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getProject(req, res, next) {
    let project
    try {
        project = await Project.findById(req.params.id)
        if(project == null) {
            return res.status(404).json({message: 'Cannot find project'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    res.project = project
    next()
}
module.exports = router