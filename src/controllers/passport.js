const passport = require("passport");
const LocalStrategy = require("passport-local");

const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id_user);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await AuthServiceInstance.login({
        email: username,
        password,
      });
      // console.log(user);
      return done(null, user);
    })
  );
  return passport;
};
