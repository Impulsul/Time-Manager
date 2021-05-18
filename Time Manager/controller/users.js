const express = require("express");
const router = express.Router({ mergeParams: true });

const validation = require("../validation");
const ApiError = require("../error/error");
const es = require("../services/elasticsearch");
const appConfig = require("../config");


router.post("/",
[validation.users.userCallAPI(), validation.validate()],
    async (req, res, next) => {
        const { username, password } = req.body;
        console.log(1);
        const user = {
            username,
            password,
        }
        try {
            const userInserted = await es.insertData.insertUser(user);
            res.json(userInserted);
        }
        catch (err) {
            next(err);
        }
    }
),


router.get("/all", (
    async (req, res, next) => {
    
    try {
        const {hits: users} = await es.search.getSystemUsers();
        const usersReturned = users.hits.map(userHit => {
            return {
                id: userHit._id,
                username: userHit._source.username
            }
        })
        res.json(usersReturned);
    }
    catch (err) {
        next(err);
    }
}
))
module.exports = router