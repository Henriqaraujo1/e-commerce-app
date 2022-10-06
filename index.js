const express = require("express");
const bodyParser = require('body-parser')
require("dotenv").config({ path: "./src/configs/example.env" });
const app = express();
const { PORT } = require("./src/configs/config");
const auth = require("./src/routes/auth");
const passport = require("passport");
const users = require('./src/services/UsersService');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200).json('Online')
})

app.use('/login/', auth);
app.get('/user/:id', users.getUserById);
app.get('/user/', users.getAllUsers);

// console.log(users.getUserById())

// app.use("/login", auth);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
