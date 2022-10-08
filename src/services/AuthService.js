const createError = require("http-errors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { emailExists, createUser, matchPassword } = require("./UsersService");

module.exports = class AuthService {
    async signup(data) {
      const { email, password } = data;

      try {
        const userExists = await emailExists(email)
        if(userExists) {
          console.log(userExists)
          throw createError(409, `Email já existe`);
        }

        const user = createUser(email, password);
        return (user);
      } catch (error) {
        throw createError(500, error)
      }
    };

    async login(data) {
      const { email, password } = data

      try {
        const user = emailExists(email);
        if(!user) { 
          throw createError(401, "Email ou senha incorreto")
        }
        const passwordCompare = await matchPassword(email, password)
        if (!passwordCompare) {
          console.log("aqui ta o erro crash")
          throw createError(401, "Email ou senha incorreto 2")
        }

        return user

      } catch (err) {
        console.log(err);
        
      }
    }
}




// module.exports = (passport) => {
//   passport.use(
//     "local-signup",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       async function (email, password, done) {
//         try {
//           const userExists = await emailExists(email);
//           if (userExists) {
//             return done(null, false, 'hahah');
//           }

//           const user = await createUser(email, password);
//           return done(null, user);
//         } catch (error) {
//           return createError(500, error);
//         }
//   );
//   passport.use(
//     "local-login",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//       },
//       async (email, password, done) => {
//         try {
//           const user = await emailExists(email);
//           if (!user) {
//             return createError(401, 'Email ou senha incorreto')
//           }
//           const isMatch = await matchPassword(password, user.password);
//           if (!isMatch) {
//             return createError(401, 'Email ou senha incorreta')
//           }
//           return done(null, { id: user.id, email: user.email });
//         } catch (error) {
//           return createError(500, error)
//         }
//       }
//     )
//   );
// };
