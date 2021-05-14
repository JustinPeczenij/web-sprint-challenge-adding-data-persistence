// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

// Doesn't work in post because post returns an object
function convertBoolean(projects) {
    const converted = projects.map(p => {
        p.project_completed === 0 ? p.project_completed = false : p.project_completed = true
        return p
    })
    return converted
}

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.getProjects()
        const converted = await convertBoolean(projects)
        res.status(200).json(converted)
    } catch(err) {
        next(err)
    }
})

// My test was failing because I was missing .first() in my model.
// I only realized after this disgusting logic i wrote below.
router.post('/', async (req, res, next) => {
    try {
        if(req.body.project_completed === true || req.body.project_completed == 1 || req.body.project_completed === 'true'){
            req.body.project_completed = 1
        } else if (req.body.project_completed === false || req.body.project_completed == 0 || req.body.project_completed === 'false') {
            req.body.project_completed = 0
        }
        const newProject = await Project.createProject(req.body)
        // Is there a way to convert the database boolean values(0, 1) other than the logic below?
        // I initially thought the database would return false and true, but it was returning 0||1. Do I have the DB setup wrong?
        newProject.project_completed === 0 ? newProject.project_completed = false : newProject.project_completed = true
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

module.exports = router