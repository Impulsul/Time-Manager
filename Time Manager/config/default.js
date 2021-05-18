const environment = process.env.NODE_ENV || "localhost";
module.exports = {
  ENVIRONMENT: environment,
  PORT: process.env.PORT || 8001,
  ES_CLIENT: {
    HOST: process.env.ES_HOST || "localhost",
    PORT: process.env.ES_PORT || 9200,
    INDEXES: {
      USERS_INDEX: process.env.USERS_INDEX || 'users',
      MEETINGS_INDEX: process.env.MEETINGS_INDEX || 'meetings',
      TASKS_INDEX: process.env.TASKS_INDEX || 'tasks'
    }
  },
};
