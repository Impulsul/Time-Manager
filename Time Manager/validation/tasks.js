const {
    check,
    validationResult,
    param,
    body,
    query,
} = require("express-validator");
const appConfig = require("../config");

function createTask() {
    return [
        body("name", "Task must have an name").isString({
            min: 1,
            max: 100
        }),
        body("username", "Task must have an owner").isString({
            min: 1,
            max: 100
        })
    ];
}
const state_states = ["created", "inprogress", "done"]

function setTaskState() {
    return [
        param("id", "id must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        }),
        param("state", `state must be in ${state_states}`).isIn(state_states)
    ];
}

function setTaskStateDone(){
    return [
        query("name", "name must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        }),
        query("id", "id must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        })
    ];
}




function deleteIdTask(){
    return [
        param("id").exists().isString({
            min: 1,
            max: 100
        })
    ];    
}

function countTask(){
    return [
        query("username", "Username must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        })
    ];
}

function countTasksByState(){
    return [
        query("state", "specify state in query parameters").exists().isString({
            min: 1,
            max: 100
        }),
        query("username", "Username must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        })
       
    ]
}

function getTaskByState(){
    return [
        param("state", `state must be in ${state_states}`).isIn(state_states)
    ];
}

module.exports = {
    createTask,
    deleteIdTask,
    countTask,
    setTaskState,
    setTaskStateDone,
    getTaskByState,
    countTasksByState
};