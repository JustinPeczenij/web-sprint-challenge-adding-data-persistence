// build your `Project` model here
const db = require('../../data/dbConfig')

function getProjects() {
    return db('projects')
}

async function createProject(project) {
    const id = await db('projects').insert(project)
    return db('projects').where('project_id', id).first()
}

module.exports = {
    getProjects,
    createProject
}