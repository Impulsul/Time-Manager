const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const appConfig = require("./config");

const reqUtils = require("./utils/request-utils.js");
const authService = require("./services/auth");


const { requestLogger } = require("./services/logging/logging")

function initServer(app) {
  app.use(
    bodyParser.json({
      limit: "5mb",
    })
  );

  app.use(requestLogger)
  app.use(reqUtils.middleware.cors());
  const usersRouter = require("./controller/users");
  app.use("/users", usersRouter);

  app.use(
    basicAuth({
      authorizer: authService.asyncAuthorizer,
      authorizeAsync: true,
      unauthorizedResponse: authService.getUnauthorizedResponse,
    })
  );

  const meetingsRouter = require("./controller/meetings");
  const tasksRouter = require("./controller/tasks");

  const authRouter = require("./controller/auth");

  app.use("/auth", authRouter);
  app.use("/meetings", meetingsRouter);
  app.use("/tasks", tasksRouter);



  app.use(reqUtils.middleware.defaultErrorHandler(appConfig.ENVIRONMENT));
  return app;
}

module.exports = {
  initServer,
};
