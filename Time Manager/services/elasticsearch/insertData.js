const esClient = require("./client");
const appConfig = require('../../config')

const insertDoc = async function (indexName, data) {
  return await esClient.index({
    index: indexName,
    body: data,
  });
};

const insertMeeting = async function(meeting) {
  return await insertDoc(appConfig.ES_CLIENT.INDEXES.MEETINGS_INDEX, meeting)
}

const insertTask = async function(task) {
  return await insertDoc(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, task)
}

const insertUser = async function (user) {
  return await insertDoc(appConfig.ES_CLIENT.INDEXES.USERS_INDEX, user)
}

// How do we add multiple meetings in the same time?

module.exports = {
  insertMeeting,
  insertTask,
  insertUser,
};
