const {
    check,
    validationResult,
    param,
    body,
    query,
} = require("express-validator");
const appConfig = require("../config");

function userCallAPI() {
    return [
        body ("username", "Enter an username").isString({
            min: 1,
            max: 100
        }),
        body("password", "Enter a password").isString({
            min: 1,
            max: 100
        })
    ];
}

module.exports={
    userCallAPI,
}


