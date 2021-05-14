// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require('./model')

function convertBoolean(task) {
    const converted = task.map(p => {
        p.project_completed === 0 ? p.project_completed = false : p.project_completed = true
        return p
    })
    return converted
}

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getTasks()
        tasks.map(task => task.task_completed === 0 ? task.task_completed = false : task.task_completed = true)
        res.status(200).json(tasks)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = await Tasks.createTask(req.body)
        newTask.task_completed === 0 ? newTask.task_completed = false : newTask.task_completed = true
        res.status(201).json(newTask)
    } catch(err) {
        next(err)
    }
})

module.exports = router