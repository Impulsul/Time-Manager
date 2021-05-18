const expressWinston = require('express-winston')
const winston = require('winston')

const consoleLogger = new winston.transports.Console({
  json: true,
  colorize: winston.format.colorize()
})

const remoteLogger = new winston.transports.File({
  filename: 'log/error.log',
  level: 'error',
  maxsize: 1024 * 1024 * 50,
})


function createRequestLogger(transports) {
  const requestLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.json(),
      winston.format.timestamp(),
      winston.format.printf(info => {
        const {req, res} = info.meta;
        const {level, timestamp} = info
        const properties = {
          url: req.url,
          query: req.query,
          ...req.params,
          ...req.body
        };
        const infoMessage =  `${timestamp} [${level}]:[${req.method}] ${JSON.stringify(properties)}`
        console.log(infoMessage)
        return infoMessage;
      })
    ),
    transports: transports
  })
  return requestLogger
}

const logger = winston.createLogger({
    level: winston.config.syslog,    
    transports: [
      consoleLogger,
      remoteLogger
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.json(),
    ),
    exitOnError: false
  })


module.exports = {
  requestLogger: expressWinston.logger(createRequestLogger([consoleLogger])),
  logger: logger
}
