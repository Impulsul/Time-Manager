const dotenv = require("dotenv").load();
const appConfig = require("./config");

const express = require("express");
const app = express();
const es = require("./services/elasticsearch");
const initApp = require('./initApp')


es.checkIfIndexExistsOrCreateIt(Object.keys(appConfig.ES_CLIENT.INDEXES))
  .then(() => {
    initApp.initServer(app).listen(appConfig.PORT, function () {
      console.log(`Server started on port: ${appConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error starting the server ${err}`);
  });

module.exports = app;
