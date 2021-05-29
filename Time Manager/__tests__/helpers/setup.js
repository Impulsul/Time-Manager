const reqUtils = require('../../utils/request-utils');
const environment = process.env.NODE_ENV || 'localhost';
const express = require('express');
const bodyParser = require('body-parser');
const authService = require("../../services/auth");
const basicAuth = require("express-basic-auth");

function getExpressApp() {
    const app = express();

    app.use(bodyParser.json({
        limit: '2mb'
    }));

    //CORS middleware
    app.use(reqUtils.middleware.cors());
    app.use(reqUtils.middleware.defaultErrorHandler(environment));

    app.use(
        basicAuth({
          authorizer: authService.asyncAuthorizer,
          authorizeAsync: true,
          unauthorizedResponse: authService.getUnauthorizedResponse,
        })
      );
    return app;
}



module.exports = {
    getExpressApp
}