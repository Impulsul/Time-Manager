function matchTasksByName(name) {
    return {
        query: {
            name: name
        }
    }
}

function matchTasksByState(state) {
    return {
        query: {
            state: state
        }
    }
}

const matchAllTasks = () => {
    return {
        query: {
            match_all: {}
        }
    }
}

const matchUserTasks = (username) => {
    return {
        query: {
            match: {
                username: username
            }
        }
    }
}

const deleteIdTask = (id) => {
    return {
        query: {
            delete: {
                id: id
            }
        }
    }
}

const countTasks = (username) => {
    return {
        query: {
            match: {
                username: username
            }
        }
    }
}

const matchUserTaskByState = (state, username) => {
    return {
        query: {
            bool: {
                must: [{
                    match: {
                        username: username
                    }
                },
                {
                    match: {
                        state: state
                    }
                }]
            }
        }
    }
}

const getTaskByState = (state) => {
    return {
        query: {
            match: {
                state: state
            }
        }
    }
}

module.exports = {
    matchAllTasks,
    matchTasksByName,
    matchUserTasks,
    deleteIdTask,
    countTasks,
    matchTasksByState,
    matchUserTaskByState,
    getTaskByState
}