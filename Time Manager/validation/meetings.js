const {
    check,
    validationResult,
    param,
    body,
    query,
} = require("express-validator");
const appConfig = require("../config");

const state_states = ["created", "ongoing", "finished"]

function createMeeting() {
    return [
        body("name", "Meeting must have an name").isString({
            min: 1,
            max: 100
        }),
        body("startDate", "Meeting must have an start date" ).isString({
            min: 1,
            max: 100
        }),
        body("duration", "Meeting must have a duration").isInt({min:15}),
        body("participants", "Meeting should have at least one participant").isArray({min:1,   max:50})
        
    ];
}



function setMeetingState() {
    return [
        param("id", "id must be specified in the query parameters").exists().isString({
            min: 1,
            max: 100
        }),
        param("state", `state must be in ${state_states}`).isIn(state_states)
    ];
}


function deleteIdMeeting() {
    return [
        param ("id", "id must be specified in the query parameters").exists().isString({
            min:1,
            max: 100
        })
    ];
}
// function getMeetingsByStartDate(){
//     return [
//         body ("startDate", "specify a start Date").
//     ];
//}
module.exports = {
    createMeeting,
    setMeetingState,
    deleteIdMeeting,
};
