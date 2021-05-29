const esClient = require("./client");
const createIndex = require("./createIndex");
const deleteIndex = require("./deleteIndex");
const insertData = require("./insertData");
const search = require("./search");
const updated = require("./update");
const count = require("./count");
const appConfig = require("../../config");
const { logger } = require("../../services/logging/logging");

async function checkIfIndexExistsOrCreateIt(indexesKeys) {
  const indexesData = indexesKeys.map(async (indexKey) => {
    const index = appConfig.ES_CLIENT.INDEXES[indexKey]
    return {
      index,
      exist: await esClient.indices.exists({ index})
    }
  })
  const indexExists = await Promise.all(indexesData)
  const data = indexExists.map(async ({ index, exist }) => {
    if (!exist) {
      const createdIndex = await createIndex(index);
      logger.info("New index was generated", { indexName: createdIndex.index });
    }
  })
  return data
}

module.exports = {
  insertData,
  search,
  updated,
  count,
  checkIfIndexExistsOrCreateIt,
  deleteIndex,
};
