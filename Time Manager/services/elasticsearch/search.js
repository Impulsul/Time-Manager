const { logger } = require("../logging/logging");
const esClient = require("./client");
const { matchUserMeetings, matchMeetingByDate} = require('../query/meetings')
const { matchUserTasks, matchAllTasks, getTaskByState} = require('../query/tasks')
const appConfig = require("../../config");
const { countTask } = require("../../validation/tasks");
const { getAllUsers } = require ("../query/users");

const searchDoc = async function (indexName, page, size, payload) {
    return await esClient.search({
        index: indexName,
        from: (page - 1) * size,
        size: size,
        body: payload,
    });
};

async function getUserMeetings(username) {
    const body = matchUserMeetings(username)
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.MEETINGS_INDEX, 1, 100, body)
}

async function getUserTasks(username) {
    const body = matchUserTasks(username)
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, 1, 100, body)
}

async function getAllTasks(){
    const body = matchAllTasks()
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, 1, 100, body)
}

async function getIdTasks(id) {
    const body = countTasks(id)
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, 1, 100, body)
}

async function getTaskState(state) {
    const body = getTaskByState(state)
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, 1, 100, body)

}

async function getSystemUsers(){
    const body = getAllUsers()
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.USERS_INDEX,1,1000, body)
}

async function getMeetingsByTimeFrame(startDate, endDate, username){
    const start =  startDate != null ? startDate : undefined
    const end = endDate != null ? endDate : undefined
    const body = matchMeetingByDate(start, end, username)
    console.log(JSON.stringify(body))
    return await searchDoc(appConfig.ES_CLIENT.INDEXES.MEETINGS_INDEX,1, 50, body)
}

module.exports = {
    getUserMeetings,
    getUserTasks,
    getAllTasks,
    getIdTasks,
    getTaskState,
    getSystemUsers,
    getMeetingsByTimeFrame
}