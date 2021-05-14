// build your `Resource` model here
const db = require('../../data/dbConfig')

function getResources() {
    return db('resources')
}

function getResourceByName(name) {
    return db('resources').where('resource_name', name)
}

async function createResource(resource) {
    const id = await db('resources').insert(resource)
    return db('resources').where('resource_id', id).first()
}

module.exports = {
    getResourceByName,
    createResource,
    getResources
} 