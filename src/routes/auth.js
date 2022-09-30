const express = require("express");
const router = express()
const passport = require("passport");
require("../services/AuthService")(passport);
const users = require('../services/UsersService');

const client = require('../db/dbConfig').default
module.exports = router;

router.use(passport.initialize());
// router.use(passport.session())




router.post(
  "/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.send('teste')
    res.json({
      user: req.user,
    });
  }
);
router.post(
  "/signin",
  passport.authenticate("local-login", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);
