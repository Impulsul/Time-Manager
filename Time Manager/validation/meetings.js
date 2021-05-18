const {
    check,
    validationResult,
    param,
    body,
    query,
} = require("express-validator");
const appConfig = require("../config");

const state_states = ["created", "ongoing", "finished"]

