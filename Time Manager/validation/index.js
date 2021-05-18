const { check, validationResult } = require("express-validator");
const meetings = require("./meetings.js");
const tasks = require("./tasks.js");
const users = require("./users");

function validate() {
    return (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() });
        }
        next();
    };
}


module.exports = {
    meetings,
    validate,
    tasks,
    users,
};
