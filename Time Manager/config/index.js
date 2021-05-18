const defaults = require("./default.js");
const environment = process.env.NODE_ENV || "default";
const config = require("./" + environment + ".js");

module.exports = Object.assign( defaults,  config);
