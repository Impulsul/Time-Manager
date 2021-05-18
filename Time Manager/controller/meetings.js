const express = require("express");
const router = express.Router({ mergeParams: true });

const validation = require("../validation");
const ApiError = require("../error/error");
const es = require("../services/elasticsearch");
const appConfig = require("../config");



module.exports = router;
