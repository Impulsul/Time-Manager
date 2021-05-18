const esClient = require("./client");
const appConfig = require("../../config")

const updateTaskState = async function (esId, state) {
  const constructor = {
    index: appConfig.ES_CLIENT.INDEXES.TASKS_INDEX,
    id: esId,
    body: {
      doc: {
        state: state
      },
    },
  };

  return await esClient.update(constructor);
}

const updateMeetingState = async function (esId, state) {
  const constructor = {
    index: appConfig.ES_CLIENT.INDEXES.MEETINGS_INDEX,
    id: esId,
    body: {
      doc: {
        state: state
      },
    },
  };

  return await esClient.update(constructor);
}


module.exports = {
  updateTaskState,
  updateMeetingState,
}