const esClient = require("./client");
const { matchAllMeetings } = require('../query/meetings');
const { matchUserTasks, matchUserTaskByState} = require('../query/tasks');
const appConfig = require('../../config');


// This is the main function to count on an index
// You will never expose the countDoc function
// If you need to expose a function you will expose the helping functions
const countDoc = async function (indexName, payload) {
  return await esClient.count({
    index: indexName,
    body: payload,
  });
};


// This is an example on how to count all the entires in a index
async function countTheTotalNumberOfMeetings() {
  const body = matchAllMeetings()
  return await countDoc(index, body);
}

async function countMeetingForUser(username) {
  const body = {};
  // return await()
}

async function countTaskForUser (username) {
  const body = matchUserTasks(username)
  return await countDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, body);
}

async function countTaskForState (state, username) {
  const body = matchUserTaskByState(state, username)
  console.log(body)
  return await countDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, body);
} 

module.exports = {
  countTheTotalNumberOfMeetings,
  countMeetingForUser,
  countTaskForUser,
  countTaskForState
};
