const ApiError = require("../error/error");
const { logger } = require('../services/logging/logging')

/**
 * Default resolving for errors and sending appropriate message with the response
 * @param {Error} err error object
 * @param {Express.Request} req express request object
 * @param {Express.Response} res express response object
 * @param {ResolveErrorOptions} options Options Object
 */
function resolveError(err, req, res, options) {
  const opts = Object.assign(
    {},
    {
      unknownErrorMessage: "Internal Server Error",
      log: false,
      displayErrorReason: false,
    },
    options
  );
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(err.toJSON());
  } else if (err.statusCode) {
    res.status(err.statusCode).json(err.error);
  } else {
    shouldTrackErr = true;
    const errorMessage = opts.displayErrorReason
      ? `${opts.unknownErrorMessage}. Reason: ${err.message}`
      : `${opts.unknownErrorMessage}`;
    res.status(500).json({ message: errorMessage });
  }
  if (opts.log) {
    const properties = {
      url: req.url,
      query: req.query,
      ...req.params,
      ...req.body
    };

    logger.error(err.message, properties);
  }
  return res.send();
}

function cors(options = {}) {
  options.allowedOrigin = options.allowedOrigin || "*";
  return function (req, res, next) {
    res.header("Access-Control-Allow-Origin", options.allowedOrigin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE");
    if (`OPTIONS` === req.method) {
      res.status(200).send();
    } else {
      next();
    }
  };
}

function defaultErrorHandler(environment) {
  if (
    environment == "localhost" ||
    environment == "test"
  ) {
    return developmentErrorHandler;
  }
  return productionErrorHandler;
}

function developmentErrorHandler(err, req, res, next) {
  resolveError(err, req, res, { log: true, req, displayErrorReason: true });
}

function productionErrorHandler(err, req, res, next) {
  resolveError(err, req, res, { log: true, req });
}

module.exports = {
  middleware: {
    cors,
    defaultErrorHandler,
  },
};
