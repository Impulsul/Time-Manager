const es = require('elasticsearch');
const appConfig = require('../../config')

const esClient = new es.Client({
	host: `http://${appConfig.ES_CLIENT.HOST}:${appConfig.ES_CLIENT.PORT}`,
	log: ['error', 'warning']
});

module.exports = esClient;