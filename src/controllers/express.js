const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { SESSION_SECRET } = require("../configs/config");

module.exports = (app) => {
  app.use(cors());

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );

  return app;
};
