const express = require("express");
const router = express.Router({ mergeParams: true });
const { logger } = require('../services/logging/logging')


router.get("/", async (req, res, next) => {
  const ok = {
    user: {
      username: req.auth.user,
      password: req.auth.password
    },
    message: "User auth",
    token: req.headers.authorization
  }
  res.json(ok);
});

module.exports = router;