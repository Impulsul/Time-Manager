module.exports = class ApiError extends Error {
    constructor(
      message,
      statusCode = 500,
      options = { serialize: true, log: false }
    ) {
      super(message);
      this.statusCode = statusCode;
      this.options = options;
    }
  
    toJSON() {
      return this.options.serialize ? { message: this.message } : message;
    }
  };
  