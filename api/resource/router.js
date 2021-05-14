// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const resources = await Resource.getResources()
        res.status(200).json(resources)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    const existingName = await Resource.getResourceByName(req.body.resource_name)
    if(!req.body.resource_name) {
        next({ status: 400, message: 'missing required resource_name'})
    }else if(existingName.length === 1) {
        next({ status: 400, message: 'resource_name must be unique'})
    } else {
        const newResource = await Resource.createResource(req.body)
        try {
            res.status(201).json(newResource)
        }
        catch(err){
            next(err)
        }
    }
})

module.exports = router