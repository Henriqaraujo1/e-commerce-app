const express = require("express");
const app = express();
require("dotenv").config({ path: "./src/configs/example.env" });
const controllers = require("./src/controllers/index");

const { PORT } = require("./src/configs/config");
const morgan = require('morgan')

// if (config("NODE_ENV") !== "test") {
//   app.use(morgan("combined"));   
// }

async function startServer() {
  controllers(app);

  app.listen(PORT, () => {
    console.log(`Servidor está rodando na PORTA ${PORT}`);
  });
}
startServer();

module.exports = startServer