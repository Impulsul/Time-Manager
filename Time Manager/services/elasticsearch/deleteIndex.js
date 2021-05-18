const esClient = require('./client');
const appConfig = require('../../config');

const deleteIndex = async function (indexName) {
    return await esClient.indices.delete({
        index: indexName
    });
}

const deleteId = async function (indexName, id) {
    return await esClient.delete({
        index: indexName,
        id: id
    });
}

const deleteTaskbyId = async function(id){
    return await deleteId(appConfig.ES_CLIENT.INDEXES.TASKS_INDEX, id);
}

const deleteMeetingbyId = async function (id) {
    return await deleteId (appConfig.ES_CLIENT.INDEXES.MEETINGS_INDEX, id);
}
module.exports = {
    deleteTaskbyId,
    deleteMeetingbyId,
};
