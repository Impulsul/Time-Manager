class TaskDOB {
    constructor(name,  username, description, startDate, endDate) {
        this.name = name
        this.username = username
        this.description = description != undefined ? description : ""
        this.startDate = startDate
        this.endDate = endDate
        this.state =  "created"
    }

    getTask() {
        return {
            name: this.name,
            username:this.username,
            description : this.description,
            startDate : this.startDate,
            endDate : this.endDate,
            state : this.state
        }
    }
}

module.exports = {
    TaskDOB
}