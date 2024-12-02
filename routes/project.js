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

router.patch('/:id',getProject, async (req,res) => {
    const { projectName, startDate, endDate, budget} = req.body

    if(projectName) res.project.projectName = projectName
    if(startDate) res.project.startDate = startDate
    if(endDate) res.project.endDate = endDate
    if(budget) res.project.budget = budget

    try {
        const updatedProject = await res.project.save()
        res.json(updatedProject)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

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