const es = require('./elasticsearch/index')
const appConfig = require('../config')
const basicAuth = require('express-basic-auth')

async function users() {
    const esUsers = await es.search.getSystemUsers()
    const users = {}
    esUsers.hits.hits.map(user => {
        users[user._source.username] = user._source.password
    })
    return users
}

async function asyncAuthorizer(username, password, cb) {
    const esUsers = await users()
    if (esUsers[username] == undefined) {
        return cb(null, false)
    }
    else if (esUsers[username] !== password) {
        return cb(null, false)
    }
    else {
        return cb(null, true)
    }
}

function getUnauthorizedResponse(req, a) {
    const unauthorized = {
        message: req.auth
            ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
            : 'No credentials provided',
        displayMessage: 'Wrong credentials',
        error: true
    }
    return unauthorized
}

module.exports = {
    users,
    asyncAuthorizer,
    getUnauthorizedResponse
}