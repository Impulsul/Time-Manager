const express = require("express");
const router = express.Router({ mergeParams: true });

const validation = require("../validation");
const ApiError = require("../error/error");
const es = require("../services/elasticsearch");
const appConfig = require("../config");

router.post(
  "/",
  [validation.meetings.createMeeting(), validation.validate()],
  async (req, res, next) => {
    let meeting = req.body;
    const username = req.auth.user;
    try {
      meeting.startDate = new Date(meeting.startDate).toJSON()
      meeting.username = username;
      meeting.state = "created";
      const meetingInserted = await es.insertData.insertMeeting(meeting)
      res.json(meetingInserted);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/user",
  [],
  async (req, res, next) => {
    const username = req.auth.user
    try {
      const { hits: userMeetings } = await es.search.getUserMeetings(username)
      const meet = userMeetings.hits.map(hit => {
        return {
          id: hit._id,
          ...hit._source
        }
      })
      res.json(meet)
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/date",
  [],
  async (req, res, next) => {
    const { startDate, endDate } = req.query
    console.log(req.query)
    const username = req.auth.user
    try {
      const { hits: userMeetings } = await es.search.getMeetingsByTimeFrame(startDate, endDate, username)
      res.json(userMeetings)
    } catch (err) {
      next(err)
    }
  }
)



router.put(
  "/:id/state/:state", [validation.meetings.setMeetingState(), validation.validate()],
  async (req, res, next) => {
    const { id, state } = req.params
    try {
      console.log(req.params)
      const status = await es.updated.updateMeetingState(id, state)
      res.json(status);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id", [validation.meetings.deleteIdMeeting(), validation.validate()],
  async (req, res, next) => {
    const { id } = req.params
    try {
      await es.deleteIndex.deleteMeetingbyId(id)
      res.status(202).send()
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
