const express = require("express");
const router = express.Router({ mergeParams: true });

const validation = require("../validation");
const ApiError = require("../error/error");
const es = require("../services/elasticsearch");
const appConfig = require("../config");



router.post(
    "/",
    [validation.tasks.createTask(), validation.validate()],
    async (req, res, next) => {
        const { name, username, description } = req.body;
        const task = {
            name,
            username,
            description: description != undefined ? description : "",
            state: "created",
        }
        try {
            console.log(task);

            const taskInserted = await es.insertData.insertTask(task);
            res.json(taskInserted);
        }
        catch (err) {
            next(err);
        }
    }
);

router.get(
    "/user",
    [],
    async (req, res, next) => {
      
        const  username  = req.auth.user
        try {
            const  { hits :userTasks}  = await es.search.getUserTasks(username)
           
            const task = userTasks.hits.map(hit => {
                return {
                    id: hit._id,
                    ...hit._source
                }
            })
          
            res.json(task)
        } catch (err) {
            next(err);
        }
    }
);

router.get(
    "/all", [],
    async (req, res, next) => {
        try {
            const { hits: AllTasks } = await es.search.getAllTasks()
            const Alltasks = AllTasks.hits.map(hit => {
                return {
                    id: hit._id,
                    ...hit._source
                }
            })
            res.json(Alltasks)
        } catch (err) {
            next(err);
        }
    }
);

router.delete(
    "/:id", [validation.tasks.deleteIdTask(), validation.validate()],
    async (req, res, next) => {
        const { id } = req.params
        try {
            await es.deleteIndex.deleteTaskbyId(id)
            res.status(202).send()
        } catch (err) {
            next(err);
        }
    }
);



router.get(
    "/count", [validation.tasks.countTask(), validation.validate()],
    async (req, res, next) => {
        const { username } = req.query
        try {
            const { count: count } = await es.count.countTaskForUser(username)

            res.json(count)
        } catch (err) {
            next(err);
        }
    }
);

router.get(
    "/count/state", [validation.tasks.countTasksByState(), validation.validate()],
    async (req, res, next) => {
        const { state, username } = req.query
        console.log(req.query)
        try {
            const count  = await es.count.countTaskForState(state, username)
            res.json(count)
        } catch (err) {
            next(err);
        }
    }
);

router.get(
    "/state/:state", [validation.tasks.getTaskByState(), validation.validate()],
    async (req, res, next) => {
        try {
            const {state} = req.params
            const { hits: statehits } = await es.search.getTaskState(state)
            const inprogresstasks = statehits.hits.map(hit => {
                return {
                    id: hit._id,
                    ...hit._source
                }
            })
            res.json(inprogresstasks);
        } catch (err) {
            next(err);
        }
    }
);


router.put(
    "/:id/state/:state", [validation.tasks.setTaskState(), validation.validate()],
    async (req, res, next) => {
        const { id, state } = req.params
        try {
            const status = await es.updated.updateTaskState(id, state)
            res.json(status);
        } catch (err) {
            next(err);
        }
    }
);






module.exports = router;
